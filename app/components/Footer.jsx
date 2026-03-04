import Link from 'next/link';

export default function Footer() {
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

        .criar-footer {
          background: var(--ink);
          border-top: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          font-family: 'DM Mono', monospace;
        }

        .criar-footer::before {
          content: 'CRIAR';
          position: absolute;
          bottom: -20px;
          right: -10px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(80px, 15vw, 180px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.04);
          pointer-events: none;
          line-height: 1;
          letter-spacing: -4px;
        }

        .criar-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 32px 40px;
        }

        .criar-footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .criar-footer-top {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .criar-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: var(--cream);
          letter-spacing: -1px;
          line-height: 1;
          margin-bottom: 16px;
        }

        .criar-brand-name span {
          color: var(--accent);
        }

        .criar-brand-desc {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.7;
          max-width: 260px;
          letter-spacing: 0.02em;
        }

        .criar-col-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          margin-bottom: 20px;
        }

        .criar-footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .criar-footer-links li {
          margin-bottom: 10px;
        }

        .criar-footer-links a,
        .criar-social-links a {
          text-decoration: none;
          color: var(--cream);
          font-size: 0.82rem;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .criar-footer-links a::before,
        .criar-social-links a::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 1px;
          background: var(--border);
          transition: width 0.3s, background 0.3s;
          flex-shrink: 0;
        }

        .criar-footer-links a:hover,
        .criar-social-links a:hover {
          color: var(--accent);
        }

        .criar-footer-links a:hover::before,
        .criar-social-links a:hover::before {
          width: 22px;
          background: var(--accent);
        }

        .criar-social-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .criar-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 28px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .criar-footer-bottom p {
          font-size: 0.72rem;
          color: var(--muted);
          letter-spacing: 0.06em;
        }

        .criar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
          margin-right: 8px;
          animation: criar-pulse 2s ease-in-out infinite;
        }

        @keyframes criar-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <footer className="criar-footer">
        <div className="criar-footer-inner">
          <div className="criar-footer-top">

            {/* Brand */}
            <div>
              <div className="criar-brand-name">
                Cri<span>ar</span>
              </div>
              <p className="criar-brand-desc">
                Empowering creators to build stunning websites with AI assistance.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="criar-col-title">Quick Links</p>
              <ul className="criar-footer-links">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="criar-col-title">Connect</p>
              <div className="criar-social-links">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
              </div>
            </div>

          </div>

          <div className="criar-footer-bottom">
            <p>
              <span className="criar-dot" />
              &copy; {new Date().getFullYear()} Criar. All rights reserved.
            </p>
            <p>Built with precision &amp; care.</p>
          </div>
        </div>
      </footer>
    </>
  );
}