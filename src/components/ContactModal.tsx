"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Growth Audit Request from ${formData.name} (${formData.company})`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:info@paragonlabsau@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-sm w-full max-w-lg relative p-8 shadow-2xl animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: '#EDF2F7' }}>Request a Growth Audit</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Fill out the form below and our senior team will get back to you shortly.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono uppercase mb-2 text-[var(--text-muted)]">Full Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[var(--navy)] border border-[var(--navy-border)] p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
              placeholder="John Doe"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase mb-2 text-[var(--text-muted)]">Email</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[var(--navy)] border border-[var(--navy-border)] p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase mb-2 text-[var(--text-muted)]">Company</label>
              <input 
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-[var(--navy)] border border-[var(--navy-border)] p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                placeholder="Company Name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-mono uppercase mb-2 text-[var(--text-muted)]">Message / Current Challenge</label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-[var(--navy)] border border-[var(--navy-border)] p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
              placeholder="Tell us about your current growth goals..."
            ></textarea>
          </div>
          
          <button type="submit" className="btn-gold w-full py-4 mt-2 rounded-sm text-sm font-semibold">
            Submit Request
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
