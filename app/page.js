'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

        .home-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--ink);
          color: var(--cream);
          font-family: 'DM Mono', monospace;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .hero-section {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 160px 32px 100px;
          text-align: center;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .hero-section.visible { opacity: 1; }

        .hero-section h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 1.05;
          letter-spacing: -3px;
          margin-bottom: 28px;
        }

        .line-accent { display: block; color: var(--accent); }
        .line-white  { display: block; color: var(--cream); }

        .hero-section p {
          max-width: 560px;
          margin: 0 auto 52px;
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.9;
          letter-spacing: 0.02em;
        }

        .hero-btns {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-solid {
          background: var(--cream);
          color: var(--ink);
          border: none;
          border-radius: 2px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 14px 32px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-solid:hover { background: #fff; transform: translateY(-2px); }

        .btn-outline {
          background: transparent;
          color: var(--cream);
          border: 1px solid var(--border);
          border-radius: 2px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 14px 32px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: border-color 0.2s, transform 0.2s;
        }
        .btn-outline:hover { border-color: var(--cream); transform: translateY(-2px); }

        /* ── DIVIDER ── */
        .section-divider {
          width: 100%;
          border: none;
          border-top: 1px solid var(--border);
        }

        /* ── FEATURES ── */
        .features-section {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 32px;
        }

        .features-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 4vw, 3rem);
          text-align: center;
          letter-spacing: -1.5px;
          color: var(--accent);
          margin-bottom: 80px;
        }

        .features-stack {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Feature card */
        .feature-card {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 64px;
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 56px 48px;
          background: #111009;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s;
        }
        .feature-card.purple::before { background: radial-gradient(700px circle at 0% 50%, rgba(108,71,255,0.08), transparent); }
        .feature-card.blue::before   { background: radial-gradient(700px circle at 100% 50%, rgba(59,130,246,0.08), transparent); }
        .feature-card.orange::before { background: radial-gradient(700px circle at 0% 50%, rgba(251,146,60,0.08), transparent); }
        .feature-card:hover::before  { opacity: 1; }
        .feature-card:hover          { border-color: rgba(200,240,58,0.25); }

        .feature-card.reverse { flex-direction: row-reverse; }

        @media (max-width: 768px) {
          .feature-card,
          .feature-card.reverse { flex-direction: column; gap: 40px; padding: 36px 24px; }
        }

        .feature-body { flex: 1; }

        .feature-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 6px;
          margin-bottom: 24px;
        }
        .feature-icon-wrap.purple { background: rgba(108,71,255,0.15); }
        .feature-icon-wrap.blue   { background: rgba(59,130,246,0.15); }
        .feature-icon-wrap.orange { background: rgba(251,146,60,0.15); }

        .feature-icon-wrap svg { width: 24px; height: 24px; fill: none; stroke-width: 2; }
        .feature-icon-wrap.purple svg { stroke: #a78bfa; }
        .feature-icon-wrap.blue svg   { stroke: #60a5fa; }
        .feature-icon-wrap.orange svg { stroke: #fb923c; }

        .feature-body h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--cream);
          letter-spacing: -0.5px;
          margin-bottom: 16px;
        }

        .feature-body > p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.9;
          letter-spacing: 0.02em;
          margin-bottom: 28px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .feature-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.78rem;
          color: var(--cream);
          letter-spacing: 0.04em;
        }
        .feature-list li::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: var(--accent);
          flex-shrink: 0;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 28px;
        }
        .tech-tag {
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.02);
        }
        .tech-label {
          display: block;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .tech-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--cream);
        }

        .feature-visual { flex: 1; width: 100%; }

        .visual-panel {
          aspect-ratio: 16/9;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: #0a0908;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .gen-engine { text-align: center; }
        .gen-engine .emoji { font-size: 3rem; margin-bottom: 8px; display: block; }
        .gen-engine .label {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .code-panel { width: 100%; height: 100%; display: flex; }
        .code-editor {
          flex: 1;
          padding: 16px;
          font-size: 0.7rem;
          line-height: 1.8;
          color: #6b7280;
          font-family: 'DM Mono', monospace;
        }
        .kw  { color: #f472b6; }
        .fn  { color: #60a5fa; }
        .tag { color: #34d399; }
        .kw2 { color: #a78bfa; }
        .code-preview {
          flex: 1;
          border-left: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.02);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .system-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 24px;
          width: 100%;
        }
        .sys-block {
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 16px;
          background: rgba(255,255,255,0.02);
        }
        .sys-bar {
          height: 2px;
          background: var(--border);
          border-radius: 1px;
          margin-bottom: 8px;
        }
        .sys-bar.short { width: 60%; }
        .sys-status {
          grid-column: span 2;
          border: 1px solid rgba(200,240,58,0.2);
          border-radius: 2px;
          padding: 10px 16px;
          background: rgba(200,240,58,0.05);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          text-align: center;
        }

        @media (max-width: 600px) {
          .hero-section { padding: 120px 24px 80px; }
          .features-section { padding: 60px 24px; }
        }
      `}</style>

      <div className="home-wrap">

        {/* ── HERO ── */}
        <section className={`hero-section${isVisible ? ' visible' : ''}`}>
          <h1>
            <span className="line-accent">Build Stunning Websites</span>
            <span className="line-white">With AI Precision</span>
          </h1>
          <p>
            Unlock your creativity with Criar. Generate production-ready HTML, CSS, and JS code instantly using our website.
          </p>
          <div className="hero-btns">
            <Link href="/dashboard" className="btn-solid">Start Creating Free</Link>
            <Link href="/about" className="btn-outline">Learn More</Link>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ── FEATURES ── */}
        <section className="features-section">
          <h2 className="features-heading">Experience the Future</h2>

          <div className="features-stack">

            {/* Card 1 — AI-Native */}
            <div className="feature-card purple">
              <div className="feature-body">
                <div className="feature-icon-wrap purple">
                  <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h3>AI-Native Development</h3>
                <p>
                  Transform abstract ideas into production-ready applications instantly. Our Gemini-powered engine understands context, design systems, and functionality requirements—writing code so you don't have to.
                </p>
                <ul className="feature-list">
                  <li>Context-aware generation</li>
                  <li>Modern, semantic HTML5 &amp; CSS3</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="visual-panel">
                  <div className="gen-engine">
                    <span className="emoji">✨</span>
                    <span className="label">Generative Engine Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Codespace */}
            <div className="feature-card blue reverse">
              <div className="feature-body">
                <div className="feature-icon-wrap blue">
                  <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                </div>
                <h3>Integrated Codespace</h3>
                <p>
                  Experience a seamless developer environment. Your personal codespace allows you to edit code in real-time with a live preview side-by-side. It's a powerful workspace designed for creators who need instant feedback.
                </p>
                <ul className="feature-list">
                  <li>Real-time Live Preview</li>
                  <li>Split-pane Editor</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="visual-panel">
                  <div className="code-panel">
                    <div className="code-editor">
                      <span className="kw">function</span> <span className="fn">App</span>() {'{'}<br/>
                      &nbsp;&nbsp;<span className="kw2">return</span> (<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">div</span>&gt;Hello World&lt;/<span className="tag">div</span>&gt;<br/>
                      &nbsp;&nbsp;);<br/>
                      {'}'}
                    </div>
                    <div className="code-preview">Preview</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Ecosystem */}
            <div className="feature-card orange">
              <div className="feature-body">
                <div className="feature-icon-wrap orange">
                  <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <h3>Modern Tech Ecosystem</h3>
                <p>
                  Built for the future. Scale your projects with our upcoming integrations. From secure authentication to database management, we're building the infrastructure so you can focus on the product.
                </p>
                <div className="tech-grid">
                  <div className="tech-tag">
                    <span className="tech-label">Authentication</span>
                    <span className="tech-value">Clerk</span>
                  </div>
                  <div className="tech-tag">
                    <span className="tech-label">Database</span>
                    <span className="tech-value">Supabase + Prisma</span>
                  </div>
                </div>
              </div>
              <div className="feature-visual">
                <div className="visual-panel">
                  <div className="system-panel">
                    <div className="sys-block">
                      <div className="sys-bar"></div>
                      <div className="sys-bar short"></div>
                    </div>
                    <div className="sys-block">
                      <div className="sys-bar"></div>
                      <div className="sys-bar short"></div>
                    </div>
                    <div className="sys-status">System Active</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}