import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="py-8 px-6 relative z-10" style={{ background: 'var(--navy)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/">
          <Image src="/images/Logo.png" alt="ParagonLabs Logo" width={110} height={28} className="object-contain brightness-0 invert" />
        </Link>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} · All rights reserved</p>
      </div>
    </footer>
  );
}
