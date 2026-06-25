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
    { 
      name: 'Tools', 
      subLinks: [
        { name: 'Invoice Tool', path: '/invoice-generator' },
        { name: 'Hours Tool', path: '/hours-calculator' }
      ]
    }
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
            link.subLinks ? (
              <div key={link.name} className="relative group">
                <button className={`transition-colors flex items-center gap-1 hover:text-white`}>
                  {link.name}
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div className="absolute top-full left-0 mt-4 w-48 bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 flex flex-col">
                  {link.subLinks.map(subLink => (
                    <Link 
                      key={subLink.name} 
                      href={subLink.path} 
                      className={`px-4 py-2 hover:bg-[var(--navy)] hover:text-[var(--gold)] transition-colors ${pathname === subLink.path ? 'text-white bg-[var(--navy)]' : 'text-[var(--text-muted)]'}`}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link 
                key={link.name} 
                href={link.path!} 
                className={`transition-colors ${pathname === link.path ? 'text-white' : 'hover:text-white'}`}
              >
                {link.name}
              </Link>
            )
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
            link.subLinks ? (
              <div key={link.name} className="flex flex-col gap-2">
                <span className="block py-1 font-semibold text-white">{link.name}</span>
                <div className="flex flex-col gap-2 pl-4 border-l border-[var(--navy-border)]">
                  {link.subLinks.map(subLink => (
                    <Link 
                      key={subLink.name} 
                      href={subLink.path} 
                      onClick={toggleMenu} 
                      className={`block py-1 hover:text-white ${pathname === subLink.path ? 'text-[var(--gold)]' : ''}`}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link 
                key={link.name} 
                href={link.path!} 
                onClick={toggleMenu} 
                className={`block py-1 hover:text-white ${pathname === link.path ? 'text-white' : ''}`}
              >
                {link.name}
              </Link>
            )
          ))}
          <Link href="/#contact" onClick={toggleMenu} className="block py-1 hover:text-white">Contact</Link>
        </div>
      )}
    </nav>
  );
}
