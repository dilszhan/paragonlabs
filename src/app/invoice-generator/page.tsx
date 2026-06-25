"use client";

import { useState, useEffect, useRef } from 'react';
import { Download, Plus, Trash2, FileText, Upload, ShieldCheck } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoiceGenerator() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: '',
    date: `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getFullYear()).slice(-2)}`,
    dueDate: '',
    fromName: '',
    fromABN: '',
    fromPhone: '',
    fromEmail: '',
    fromAddress: '',
    toName: '',
    toABN: '',
    toPhone: '',
    toEmail: '',
    toAddress: '',
    notes: '',
    bankDetails: '',
    currency: '$',
    taxLabel: 'GST',
    taxRate: 0,
    logoUrl: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedDetails = localStorage.getItem('invoiceDetails');
    const savedItems = localStorage.getItem('invoiceItems');
    if (savedDetails) {
      try { setInvoiceDetails(JSON.parse(savedDetails)); } catch (e) {}
    }
    if (savedItems) {
      try { setItems(JSON.parse(savedItems)); } catch (e) {}
    }
    setIsLoaded(true);


  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('invoiceDetails', JSON.stringify(invoiceDetails));
      localStorage.setItem('invoiceItems', JSON.stringify(items));
    }
  }, [invoiceDetails, items, isLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceDetails({ ...invoiceDetails, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setInvoiceDetails({ ...invoiceDetails, logoUrl: '' });
  };

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), description: '', quantity: 1, rate: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const taxAmount = subtotal * (invoiceDetails.taxRate / 100);
  const total = subtotal + taxAmount;

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);

      const { pdf } = await import('@react-pdf/renderer');
      const { default: InvoicePDF } = await import('@/components/InvoicePDF');
      const { saveAs } = await import('file-saver');

      console.log('Generating latest PDF version...');

      const blob = await pdf(<InvoicePDF details={invoiceDetails} items={items} />).toBlob();
      
      saveAs(blob, `Invoice_${invoiceDetails.invoiceNumber || 'Draft'}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an issue generating the PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Prevent rendering raw state until hydration is complete to avoid SSR mismatch
  if (!isLoaded) return <div className="min-h-screen"></div>;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '4rem' }} className="relative z-10">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label mb-3" style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(139,90,43, 0.1)', border: '1px solid rgba(139,90,43, 0.2)', borderRadius: '2rem' }}>
            Free Agency Tool
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4" style={{ color: '#EDF2F7' }}>Professional <span className="gold-gradient">Invoice Generator</span></h1>
          <p className="text-[var(--text-muted)] max-w-[600px] mx-auto">
            Create, customize, and download beautiful invoices in seconds. Completely free, no sign-up required.
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-400 font-mono bg-green-400/10 inline-flex px-4 py-2 rounded-sm border border-green-400/20 mx-auto">
            <ShieldCheck size={16} /> 
            100% Private. Data is saved only in your own browser's local storage.
          </div>
        </div>

        <div className="invoice-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          
          {/* Main Invoice Editor Area */}
          <div className="card" style={{ padding: '3rem', borderRadius: '4px', background: 'var(--navy-card)', color: '#ffffff' }} id="invoice-preview">
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
              <div style={{ flex: 1, maxWidth: '50%' }}>
                {/* Logo Upload */}
                <div className="mb-4">
                  {invoiceDetails.logoUrl ? (
                    <div className="relative group inline-block">
                      <img src={invoiceDetails.logoUrl} alt="Company Logo" style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain' }} />
                      <button onClick={removeLogo} className="hide-on-print absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="hide-on-print">
                      <input type="file" accept="image/*" onChange={handleLogoUpload} ref={fileInputRef} className="hidden" />
                      <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-sm text-gray-500 border border-dashed border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors">
                        <Upload size={16} /> Upload Logo
                      </button>
                    </div>
                  )}
                </div>

                <input type="text" name="fromName" placeholder="Your Company Name" value={invoiceDetails.fromName} onChange={handleInputChange} className="invoice-input" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }} />
                <input type="text" name="fromABN" placeholder="ABN / Tax ID (Optional)" value={invoiceDetails.fromABN} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
                <textarea name="fromAddress" placeholder="Your Address" value={invoiceDetails.fromAddress} onChange={handleInputChange} className="invoice-input" style={{ display: 'block', height: '34px', minHeight: '34px', color: 'var(--text-muted)' }} />
                <input type="email" name="fromEmail" placeholder="Your Email" value={invoiceDetails.fromEmail} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
                <input type="text" name="fromPhone" placeholder="Your Phone Number (Optional)" value={invoiceDetails.fromPhone} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
              </div>

              <div style={{ textAlign: 'right' }}>
                <h2 className="font-display" style={{ fontSize: '2.5rem', color: '#e5e7eb', textTransform: 'uppercase', letterSpacing: '0.1em' }}>INVOICE</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Invoice #</span>
                  <input type="text" name="invoiceNumber" placeholder="INV-001" value={invoiceDetails.invoiceNumber} onChange={handleInputChange} className="invoice-input text-right" style={{ width: '120px', fontWeight: 600 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date</span>
                  <input type="text" name="date" placeholder="DD/MM/YY" value={invoiceDetails.date} onChange={handleInputChange} className="invoice-input text-right" style={{ width: '150px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Due Date</span>
                  <input type="text" name="dueDate" placeholder="DD/MM/YY" value={invoiceDetails.dueDate} onChange={handleInputChange} className="invoice-input text-right" style={{ width: '150px' }} />
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div style={{ marginBottom: '3rem', borderTop: '1px solid var(--navy-border)', paddingTop: '2rem' }}>
              <h3 style={{ color: '#9ca3af', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Bill To</h3>
              <input type="text" name="toName" placeholder="Client Name" value={invoiceDetails.toName} onChange={handleInputChange} className="invoice-input" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }} />
              <input type="text" name="toABN" placeholder="Client ABN / Tax ID (Optional)" value={invoiceDetails.toABN} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
              <textarea name="toAddress" placeholder="Client Address" value={invoiceDetails.toAddress} onChange={handleInputChange} className="invoice-input" style={{ display: 'block', height: '34px', minHeight: '34px', color: 'var(--text-muted)' }} />
              <input type="email" name="toEmail" placeholder="Client Email" value={invoiceDetails.toEmail} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
              <input type="text" name="toPhone" placeholder="Client Phone (Optional)" value={invoiceDetails.toPhone} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
            </div>

            {/* Items Table */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr 1.5fr 1.5fr 30px', gap: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--navy-border)', color: 'var(--text-body)', fontWeight: 600, fontSize: '0.9rem' }}>
                <div>Description</div>
                <div style={{ textAlign: 'center' }}>Qty</div>
                <div style={{ textAlign: 'right' }}>Rate</div>
                <div style={{ textAlign: 'right' }}>Amount</div>
                <div></div>
              </div>

              <div className="items-list">
                {items.map((item, index) => (
                  <div key={item.id} className="item-row" style={{ display: 'grid', gridTemplateColumns: '4fr 1fr 1.5fr 1.5fr 30px', gap: '1rem', alignItems: 'start', padding: '1rem 0', borderBottom: '1px solid var(--navy-border)' }}>
                    <textarea 
                      value={item.description} 
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description (e.g., Web Development)"
                      className="invoice-input"
                      style={{ minHeight: '40px', resize: 'vertical' }}
                    />
                    <input 
                      type="number" 
                      value={item.quantity || ''} 
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="invoice-input text-center"
                      placeholder="0"
                    />
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '8px', top: '8px', color: '#9ca3af' }}>{invoiceDetails.currency}</span>
                      <input 
                        type="number" 
                        value={item.rate || ''} 
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="invoice-input text-right"
                        style={{ paddingLeft: '20px' }}
                        placeholder="0.00"
                      />
                    </div>
                    <div style={{ textAlign: 'right', padding: '8px', fontWeight: 500, color: '#ffffff' }}>
                      {invoiceDetails.currency}{(item.quantity * item.rate).toFixed(2)}
                    </div>
                    <button onClick={() => removeItem(item.id)} className="delete-btn hide-on-print" style={{ color: '#ef4444', padding: '8px', borderRadius: '4px' }} title="Remove Item">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              
              <button onClick={addItem} className="add-item-btn hide-on-print" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#3b82f6', fontWeight: 500, padding: '0.5rem', borderRadius: '4px', border: 'none', background: 'transparent' }}>
                <Plus size={18} /> Add Line Item
              </button>
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
              <div style={{ width: '350px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--navy-border)', color: 'var(--text-muted)' }}>
                  <span>Subtotal</span>
                  <span>{invoiceDetails.currency}{subtotal.toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--navy-border)', color: 'var(--text-muted)', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <input 
                      type="text" 
                      name="taxLabel" 
                      value={invoiceDetails.taxLabel} 
                      onChange={handleInputChange} 
                      placeholder="Tax/GST" 
                      className="invoice-input" 
                      style={{ width: '80px', padding: '2px', color: 'var(--text-muted)' }} 
                    />
                    <span>(%)</span>
                    <input 
                      type="number" 
                      name="taxRate" 
                      value={invoiceDetails.taxRate || ''} 
                      onChange={handleInputChange} 
                      placeholder="0"
                      className="invoice-input text-right" 
                      style={{ width: '60px', padding: '2px' }} 
                    />
                  </div>
                  <span>{invoiceDetails.currency}{taxAmount.toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', color: '#ffffff', fontWeight: 700, fontSize: '1.25rem' }}>
                  <span>Total</span>
                  <span>{invoiceDetails.currency}{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Bottom Info: Notes & Bank Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h3 style={{ color: '#9ca3af', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Payment Details</h3>
                <textarea 
                  name="bankDetails" 
                  value={invoiceDetails.bankDetails} 
                  onChange={handleInputChange} 
                  placeholder="Bank Name: &#10;Account Name: &#10;BSB / Sort Code: &#10;Account Number: "
                  className="invoice-input" 
                  style={{ width: '100%', minHeight: '80px', color: '#ffffff', fontWeight: 500 }} 
                />
              </div>
              <div>
                <h3 style={{ color: '#9ca3af', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Notes / Terms</h3>
                <textarea 
                  name="notes" 
                  value={invoiceDetails.notes} 
                  onChange={handleInputChange} 
                  placeholder="Thank you for your business. Payment is due within 14 days."
                  className="invoice-input" 
                  style={{ width: '100%', minHeight: '80px', color: 'var(--text-muted)' }} 
                />
              </div>
            </div>
          </div>

          {/* Settings / Controls Sidebar */}
          <div className="hide-on-print sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
              <h3 className="font-semibold" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EDF2F7' }}><FileText size={20} className="gold" /> Invoice Settings</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Currency Symbol</label>
                <input type="text" name="currency" value={invoiceDetails.currency} onChange={handleInputChange} className="w-full bg-[var(--navy)] border border-[var(--navy-border)] text-white px-3 py-2 rounded-sm focus:outline-none focus:border-[var(--gold)]" />
              </div>

              <div style={{ borderTop: '1px solid var(--navy-border)', margin: '1.5rem 0' }}></div>

              <button onClick={handleDownloadPDF} disabled={isDownloading} className="btn-gold w-full flex gap-2 justify-center py-3 px-4 rounded-sm text-sm disabled:opacity-50">
                <Download size={18} className={isDownloading ? "animate-bounce" : ""} /> {isDownloading ? "Generating PDF..." : "Download PDF"}
              </button>
              
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                Tip: When the print dialog opens, set the destination to "Save as PDF" and turn off headers/footers for the best result.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .invoice-input {
          background: transparent;
          border: 1px solid transparent;
          font-family: inherit;
          font-size: 0.95rem;
          padding: 4px 8px;
          border-radius: 4px;
          transition: border-color 0.2s, background-color 0.2s;
          width: 100%;
        }
        .invoice-input:hover, .invoice-input:focus {
          border-color: var(--navy-border);
          background-color: var(--navy);
          outline: none;
        }
        .invoice-input::placeholder {
          color: #9ca3af;
          opacity: 0.7;
        }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .title-input { padding: 0; }
        .title-input:hover, .title-input:focus { background-color: transparent; border-color: transparent; background: var(--navy); }
        
        .add-item-btn:hover { background-color: var(--navy-border); cursor: pointer; }
        .delete-btn { background: transparent; border: none; cursor: pointer; }
        .delete-btn:hover { background-color: var(--navy-border); }
        
        textarea { resize: none; overflow: hidden; }

        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .navbar, footer, .hide-on-print { display: none !important; }
          #invoice-preview { box-shadow: none !important; padding: 0 !important; border: none !important; background: transparent !important; }
          .invoice-layout { display: block !important; }
          .invoice-input { border-color: transparent !important; background: transparent !important; padding: 0 !important; }
          .invoice-input::placeholder { color: transparent !important; }
          @page { margin: 0.5cm; }
        }

        @media (max-width: 1024px) {
          .invoice-layout { grid-template-columns: 1fr !important; }
          .sidebar { order: -1; }
        }
        
        @media (max-width: 640px) {
          .item-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; padding-bottom: 1.5rem !important; }
          .item-row > div:nth-child(2), .item-row > div:nth-child(3), .item-row > div:nth-child(4) { text-align: left; }
          .item-row input.text-right, .item-row input.text-center { text-align: left; }
        }
      `}</style>
    </div>
  );
}
