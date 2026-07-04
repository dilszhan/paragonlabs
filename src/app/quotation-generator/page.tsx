"use client";

import { useState, useEffect, useRef } from 'react';
import { Download, Plus, Trash2, FileText, Upload, ShieldCheck, Image as ImageIcon, ToggleLeft, ToggleRight } from 'lucide-react';

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  imageUrl?: string;
}

export default function QuotationGenerator() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [quotationDetails, setQuotationDetails] = useState({
    quotationNumber: '',
    date: `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getFullYear()).slice(-2)}`,
    validUntil: '',
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
    currency: '$',
    taxLabel: 'GST',
    taxRate: 0,
    logoUrl: '',
    mode: 'basic' as 'basic' | 'advanced'
  });

  const [items, setItems] = useState<QuotationItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedDetails = localStorage.getItem('quotationDetails');
    const savedItems = localStorage.getItem('quotationItems');
    if (savedDetails) {
      try { 
        const parsed = JSON.parse(savedDetails);
        setQuotationDetails(prev => ({ ...prev, ...parsed })); 
      } catch (e) {}
    }
    if (savedItems) {
      try { setItems(JSON.parse(savedItems)); } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('quotationDetails', JSON.stringify(quotationDetails));
      localStorage.setItem('quotationItems', JSON.stringify(items));
    }
  }, [quotationDetails, items, isLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuotationDetails({ ...quotationDetails, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setQuotationDetails({
      ...quotationDetails,
      mode: quotationDetails.mode === 'basic' ? 'advanced' : 'basic'
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQuotationDetails({ ...quotationDetails, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setQuotationDetails({ ...quotationDetails, logoUrl: '' });
  };

  const handleItemImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItem(id, 'imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeItemImage = (id: string) => {
    updateItem(id, 'imageUrl', '');
  };

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), description: '', quantity: 1, rate: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const taxAmount = subtotal * (quotationDetails.taxRate / 100);
  const total = subtotal + taxAmount;

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);

      const { pdf } = await import('@react-pdf/renderer');
      const { default: QuotationPDF } = await import('@/components/QuotationPDF');
      const { saveAs } = await import('file-saver');

      const blob = await pdf(<QuotationPDF details={quotationDetails} items={items} />).toBlob();
      
      saveAs(blob, `Quotation_${quotationDetails.quotationNumber || 'Draft'}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an issue generating the PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const confirmClearData = () => {
    setQuotationDetails({
      quotationNumber: '',
      date: `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getFullYear()).slice(-2)}`,
      validUntil: '',
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
      currency: '$',
      taxLabel: 'GST',
      taxRate: 0,
      logoUrl: '',
      mode: 'basic'
    });
    setItems([{ id: Date.now().toString(), description: '', quantity: 1, rate: 0 }]);
    localStorage.removeItem('quotationDetails');
    localStorage.removeItem('quotationItems');
    setShowClearConfirm(false);
  };

  if (!isLoaded) return <div className="min-h-screen"></div>;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '4rem' }} className="relative z-10">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label mb-3" style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(139,90,43, 0.1)', border: '1px solid rgba(139,90,43, 0.2)', borderRadius: '2rem' }}>
            Free Agency Tool
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4" style={{ color: '#EDF2F7' }}>Professional <span className="gold-gradient">Quotation Generator</span></h1>
          <p className="text-[var(--text-muted)] max-w-[600px] mx-auto">
            Create, customize, and download beautiful quotations in seconds. Add designs and images for physical products using the advanced mode.
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-400 font-mono bg-green-400/10 inline-flex px-4 py-2 rounded-sm border border-green-400/20 mx-auto">
            <ShieldCheck size={16} /> 
            100% Private. Data is saved only in your own browser's local storage.
          </div>
        </div>

        <div className="invoice-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          
          {/* Main Editor Area */}
          <div className="card" style={{ padding: '3rem', borderRadius: '4px', background: 'var(--navy-card)', color: '#ffffff' }} id="invoice-preview">
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
              <div style={{ flex: 1, maxWidth: '50%' }}>
                {/* Logo Upload */}
                <div className="mb-4">
                  {quotationDetails.logoUrl ? (
                    <div className="relative group inline-block">
                      <img src={quotationDetails.logoUrl} alt="Company Logo" style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain' }} />
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

                <input type="text" name="fromName" placeholder="Your Company Name" value={quotationDetails.fromName} onChange={handleInputChange} className="invoice-input" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }} />
                <input type="text" name="fromABN" placeholder="ABN / Tax ID (Optional)" value={quotationDetails.fromABN} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
                <textarea name="fromAddress" placeholder="Your Address" value={quotationDetails.fromAddress} onChange={handleInputChange} className="invoice-input" style={{ display: 'block', height: '34px', minHeight: '34px', color: 'var(--text-muted)' }} />
                <input type="email" name="fromEmail" placeholder="Your Email" value={quotationDetails.fromEmail} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
                <input type="text" name="fromPhone" placeholder="Your Phone Number (Optional)" value={quotationDetails.fromPhone} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
              </div>

              <div style={{ textAlign: 'right' }}>
                <h2 className="font-display" style={{ fontSize: '2.5rem', color: '#e5e7eb', textTransform: 'uppercase', letterSpacing: '0.1em' }}>QUOTATION</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Quote #</span>
                  <input type="text" name="quotationNumber" placeholder="QT-001" value={quotationDetails.quotationNumber} onChange={handleInputChange} className="invoice-input text-right" style={{ width: '120px', fontWeight: 600 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date</span>
                  <input type="text" name="date" placeholder="DD/MM/YY" value={quotationDetails.date} onChange={handleInputChange} className="invoice-input text-right" style={{ width: '150px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Valid Until</span>
                  <input type="text" name="validUntil" placeholder="DD/MM/YY" value={quotationDetails.validUntil} onChange={handleInputChange} className="invoice-input text-right" style={{ width: '150px' }} />
                </div>
              </div>
            </div>

            {/* Quote To */}
            <div style={{ marginBottom: '3rem', borderTop: '1px solid var(--navy-border)', paddingTop: '2rem' }}>
              <h3 style={{ color: '#9ca3af', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Quote For</h3>
              <input type="text" name="toName" placeholder="Client Name" value={quotationDetails.toName} onChange={handleInputChange} className="invoice-input" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }} />
              <input type="text" name="toABN" placeholder="Client ABN / Tax ID (Optional)" value={quotationDetails.toABN} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
              <textarea name="toAddress" placeholder="Client Address" value={quotationDetails.toAddress} onChange={handleInputChange} className="invoice-input" style={{ display: 'block', height: '34px', minHeight: '34px', color: 'var(--text-muted)' }} />
              <input type="email" name="toEmail" placeholder="Client Email" value={quotationDetails.toEmail} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
              <input type="text" name="toPhone" placeholder="Client Phone (Optional)" value={quotationDetails.toPhone} onChange={handleInputChange} className="invoice-input" style={{ color: 'var(--text-muted)' }} />
            </div>

            {/* Items Table */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: quotationDetails.mode === 'advanced' ? '80px 4fr 1fr 1.5fr 1.5fr 30px' : '4fr 1fr 1.5fr 1.5fr 30px', gap: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--navy-border)', color: 'var(--text-body)', fontWeight: 600, fontSize: '0.9rem' }}>
                {quotationDetails.mode === 'advanced' && <div>Design</div>}
                <div>Description</div>
                <div style={{ textAlign: 'center' }}>Qty</div>
                <div style={{ textAlign: 'right' }}>Price</div>
                <div style={{ textAlign: 'right' }}>Total</div>
                <div></div>
              </div>

              <div className="items-list">
                {items.map((item) => (
                  <div key={item.id} className="item-row" style={{ display: 'grid', gridTemplateColumns: quotationDetails.mode === 'advanced' ? '80px 4fr 1fr 1.5fr 1.5fr 30px' : '4fr 1fr 1.5fr 1.5fr 30px', gap: '1rem', alignItems: 'start', padding: '1rem 0', borderBottom: '1px solid var(--navy-border)' }}>
                    
                    {quotationDetails.mode === 'advanced' && (
                      <div className="relative group">
                        {item.imageUrl ? (
                          <>
                            <img src={item.imageUrl} alt="Item" className="w-16 h-16 object-contain bg-gray-50 rounded border border-gray-200" />
                            <button onClick={() => removeItemImage(item.id)} className="hide-on-print absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 size={10} />
                            </button>
                          </>
                        ) : (
                          <div className="w-16 h-16 border-2 border-dashed border-[var(--navy-border)] rounded flex items-center justify-center cursor-pointer hover:bg-[var(--navy)] transition-colors hide-on-print relative">
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                              onChange={(e) => handleItemImageUpload(item.id, e)} 
                              title="Upload product image"
                            />
                            <ImageIcon size={18} className="text-[var(--text-muted)]" />
                          </div>
                        )}
                        {!item.imageUrl && <div className="print-only w-16 h-16 bg-gray-50 border border-gray-200 rounded hidden"></div>}
                      </div>
                    )}

                    <textarea 
                      value={item.description} 
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description (e.g., Custom T-Shirt Design)"
                      className="invoice-input"
                      style={{ minHeight: '64px', resize: 'vertical' }}
                    />
                    <input 
                      type="number" 
                      value={item.quantity || ''} 
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="invoice-input text-center"
                      placeholder="0"
                    />
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '8px', top: '8px', color: '#9ca3af' }}>{quotationDetails.currency}</span>
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
                      {quotationDetails.currency}{(item.quantity * item.rate).toFixed(2)}
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
                  <span>{quotationDetails.currency}{subtotal.toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--navy-border)', color: 'var(--text-muted)', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <input 
                      type="text" 
                      name="taxLabel" 
                      value={quotationDetails.taxLabel} 
                      onChange={handleInputChange} 
                      placeholder="Tax/GST" 
                      className="invoice-input" 
                      style={{ width: '80px', padding: '2px', color: 'var(--text-muted)' }} 
                    />
                    <span>(%)</span>
                    <input 
                      type="number" 
                      name="taxRate" 
                      value={quotationDetails.taxRate || ''} 
                      onChange={handleInputChange} 
                      placeholder="0"
                      className="invoice-input text-right" 
                      style={{ width: '60px', padding: '2px' }} 
                    />
                  </div>
                  <span>{quotationDetails.currency}{taxAmount.toFixed(2)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', color: '#ffffff', fontWeight: 700, fontSize: '1.25rem' }}>
                  <span>Total Amount</span>
                  <span>{quotationDetails.currency}{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Bottom Info: Notes & Bank Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
              <div>
                <h3 style={{ color: '#9ca3af', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Notes / Terms</h3>
                <textarea 
                  name="notes" 
                  value={quotationDetails.notes} 
                  onChange={handleInputChange} 
                  placeholder="Thank you for the opportunity to quote. This quote is valid for 30 days."
                  className="invoice-input" 
                  style={{ width: '100%', minHeight: '80px', color: 'var(--text-muted)' }} 
                />
              </div>
            </div>
          </div>

          {/* Settings / Controls Sidebar */}
          <div className="hide-on-print sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
              <h3 className="font-semibold" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EDF2F7' }}><FileText size={20} className="gold" /> Quote Settings</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="flex items-center justify-between mb-2">
                  <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Advanced Mode</label>
                  <button onClick={toggleMode} className="text-[var(--gold)] hover:text-white transition-colors" title="Toggle mode to enable product images">
                    {quotationDetails.mode === 'advanced' ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-500" />}
                  </button>
                </div>
                <p className="text-xs text-[var(--text-muted)] opacity-70 mb-4">
                  Enable advanced mode to attach a product image or design concept to each line item.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Currency Symbol</label>
                <input type="text" name="currency" value={quotationDetails.currency} onChange={handleInputChange} className="w-full bg-[var(--navy)] border border-[var(--navy-border)] text-white px-3 py-2 rounded-sm focus:outline-none focus:border-[var(--gold)]" />
              </div>

              <div style={{ borderTop: '1px solid var(--navy-border)', margin: '1.5rem 0' }}></div>

              <button onClick={handleDownloadPDF} disabled={isDownloading} className="btn-gold w-full flex gap-2 justify-center py-3 px-4 rounded-sm text-sm disabled:opacity-50 mb-3">
                <Download size={18} className={isDownloading ? "animate-bounce" : ""} /> {isDownloading ? "Generating PDF..." : "Download PDF"}
              </button>

              <button onClick={() => setShowClearConfirm(true)} className="w-full flex gap-2 justify-center py-2 px-4 rounded-sm text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 size={16} /> Clear All Data
              </button>
              
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                Tip: Attach your high-res product photos to present beautiful visual quotes to your clients.
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
        
        .add-item-btn:hover { background-color: var(--navy-border); cursor: pointer; }
        .delete-btn { background: transparent; border: none; cursor: pointer; }
        .delete-btn:hover { background-color: var(--navy-border); }
        
        textarea { resize: none; overflow: hidden; }

        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .navbar, footer, .hide-on-print { display: none !important; }
          .print-only { display: block !important; }
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

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded shadow-2xl p-6 max-w-md w-full" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
            <h3 className="text-xl font-semibold text-white mb-3">Clear all data?</h3>
            <p className="text-[var(--text-muted)] mb-6">
              Are you sure you want to clear all quote data? This action cannot be undone and will reset the form to a blank state.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded text-[var(--text-body)] hover:bg-[var(--navy)] border border-transparent hover:border-[var(--navy-border)] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmClearData}
                className="px-4 py-2 rounded bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} /> Yes, clear data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
