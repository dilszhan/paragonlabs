"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'About', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Work', path: '/#work' },
    { name: 'Invoice Tool', path: '/invoice-generator' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 navbar">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold gold-gradient">
          ParagonLabs
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`transition-colors ${pathname === link.path ? 'text-white' : 'hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <Link href="/#contact" className="hidden md:inline-block btn-gold text-xs px-5 py-2 rounded-sm">
          Let's Talk
        </Link>
        
        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={toggleMenu}>
          <span className="block w-5 h-px bg-white"></span>
          <span className="block w-5 h-px bg-white"></span>
          <span className="block w-5 h-px bg-white"></span>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="flex-col gap-4 pt-4 pb-2 px-2 md:hidden text-sm flex" style={{ color: 'var(--text-muted)' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              onClick={toggleMenu} 
              className="block py-1 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/#contact" onClick={toggleMenu} className="block py-1 hover:text-white">Contact</Link>
        </div>
      )}
    </nav>
  );
}
