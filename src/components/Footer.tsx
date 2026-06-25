import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-8 px-6 relative z-10" style={{ background: 'var(--navy)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg gold-gradient">ParagonLabs</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} · All rights reserved</p>
      </div>
    </footer>
  );
}
