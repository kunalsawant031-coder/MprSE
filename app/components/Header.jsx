'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

        :root {
          --cream: #f0ebe1;
          --ink: #0e0d0b;
          --accent: #c8f03a;
          --muted: #6b6760;
          --border: #2a2925;
        }

        .criar-nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 50;
          background: rgba(14, 13, 11, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 16px 0;
          transition: box-shadow 0.3s;
          font-family: 'DM Mono', monospace;
        }

        .criar-nav.scrolled {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
        }

        .criar-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Logo */
        .criar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .criar-logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--accent) 0%, #8fff00 100%);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
        }

        .criar-logo:hover .criar-logo-icon {
          transform: scale(1.1);
        }

        .criar-logo-icon span {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: var(--ink);
        }

        .criar-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--cream);
          letter-spacing: -0.5px;
          transition: color 0.3s;
        }

        .criar-logo:hover .criar-logo-text {
          color: var(--accent);
        }

        /* Nav links */
        .criar-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .criar-nav-links a {
          text-decoration: none;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          transition: color 0.2s;
          position: relative;
        }

        .criar-nav-links a.active,
        .criar-nav-links a:hover {
          color: var(--cream);
        }

        .criar-nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--accent);
        }

        /* Auth */
        .criar-nav-auth {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .criar-btn-ghost {
          background: none;
          border: none;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: color 0.2s;
          text-transform: uppercase;
          padding: 0;
        }

        .criar-btn-ghost:hover {
          color: var(--cream);
        }

        .criar-btn-primary {
          background: var(--accent);
          color: var(--ink);
          border: none;
          border-radius: 2px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 9px 20px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .criar-btn-primary:hover {
          background: #d4f545;
          transform: translateY(-1px);
        }

        /* Hamburger */
        .criar-hamburger {
          display: none;
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }

        .criar-hamburger:hover {
          color: var(--cream);
        }

        /* Mobile menu */
        .criar-mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: rgba(14, 13, 11, 0.98);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
          opacity: 0;
        }

        .criar-mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }

        .criar-mobile-menu-inner {
          padding: 24px 32px 32px;
        }

        .criar-mobile-menu a {
          display: block;
          text-decoration: none;
          color: var(--muted);
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }

        .criar-mobile-menu a:hover,
        .criar-mobile-menu a.active {
          color: var(--cream);
        }

        .criar-mobile-auth {
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .criar-nav-links,
          .criar-nav-auth {
            display: none;
          }

          .criar-hamburger {
            display: block;
          }
        }
      `}</style>

      <nav className={`criar-nav${isScrolled ? ' scrolled' : ''}`}>
        <div className="criar-nav-inner">

          {/* Logo */}
          <Link href="/" className="criar-logo">
            <div className="criar-logo-icon">
              <span>C</span>
            </div>
            <span className="criar-logo-text">Criar</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="criar-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          <div className="criar-nav-auth">
            <SignedOut>
              <SignInButton>
                <button className="criar-btn-ghost">Sign In</button>
              </SignInButton>
              <SignUpButton>
                <button className="criar-btn-primary">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
              <Link href="/dashboard" className="criar-btn-primary">
                Get Started
              </Link>
            </SignedIn>
          </div>

          {/* Hamburger */}
          <button
            className="criar-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`criar-mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
          <div className="criar-mobile-menu-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="criar-mobile-auth">
              <SignedOut>
                <SignInButton>
                  <button className="criar-btn-ghost" style={{ textAlign: 'left' }}>Sign In</button>
                </SignInButton>
                <SignUpButton>
                  <button className="criar-btn-primary" style={{ textAlign: 'center' }}>Sign Up</button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <Link
                  href="/dashboard"
                  className="criar-btn-primary"
                  style={{ textAlign: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}