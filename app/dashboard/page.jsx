"use client";

import { useState } from "react";

const GlitchText = ({ children, className }) => (
  <span className={className} style={{
    position: 'relative',
    display: 'inline-block',
  }}>
    {children}
  </span>
);

export default function Dashboard() {
  const credits = 10;
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      color: '#fff',
      fontFamily: '"DM Mono", "Courier New", monospace',
      padding: '0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .scan-line {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
          z-index: 100;
        }

        .grid-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .glow-orb {
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(150, 80, 255, 0.18) 0%, transparent 70%);
          top: -200px;
          right: -100px;
          pointer-events: none;
        }

        .glow-orb-2 {
          position: fixed;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 60, 150, 0.14) 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
          pointer-events: none;
        }

        .credit-badge {
          background: rgba(20, 20, 20, 0.95);
          border: 1px solid rgba(255,255,255,0.18);
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }

        .credit-badge::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(100,255,100,0.06), transparent);
        }

        .new-project-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          padding: 10px 24px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }

        .new-project-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(180, 80, 255, 0.15), rgba(255, 60, 130, 0.1));
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .new-project-btn:hover::before { opacity: 1; }
        .new-project-btn:hover { border-color: rgba(180, 80, 255, 0.5); }

        .create-card {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          height: 240px;
          position: relative;
          transition: all 0.3s ease;
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
          overflow: hidden;
        }

        .create-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(180,80,255,0.06), rgba(255,60,130,0.04));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .create-card:hover { border-color: rgba(180, 80, 255, 0.3); }
        .create-card:hover::before { opacity: 1; }

        .create-card:hover .icon-wrap {
          border-color: rgba(180,80,255,0.4);
          background: rgba(180,80,255,0.08);
          transform: scale(1.1);
        }

        .create-card:hover .icon-wrap svg {
          color: rgba(200, 120, 255, 0.9);
        }

        .create-card:hover .card-title { color: #fff; }

        .icon-wrap {
          width: 52px;
          height: 52px;
          border: 1px solid rgba(255,255,255,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        .icon-wrap svg { transition: all 0.3s ease; }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          display: inline-block;
          margin-right: 8px;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(74, 222, 128, 0); }
        }

        .corner-accent {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: rgba(180,80,255,0.4);
          border-style: solid;
        }

        .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        .header-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .fade-in {
          animation: fadeIn 0.6s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.35s; opacity: 0; }
      `}</style>

      <div className="scan-line" />
      <div className="grid-bg" />
      <div className="glow-orb" />
      <div className="glow-orb-2" />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="fade-in stagger-1" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '64px',
          gap: '24px',
        }}>
          <div>
            <div className="header-label">// workspace</div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #fff 60%, rgba(255,255,255,0.55))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Dashboard
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              marginTop: '10px',
              fontSize: '13px',
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.05em',
            }}>
              <span className="status-dot" />
              Welcome back, Creator
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div className="credit-badge">
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Credits</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 700, color: '#4ade80' }}>{credits}</span>
            </div>
            <a href="/x" className="new-project-btn">
              <span style={{ position: 'relative', zIndex: 1 }}>+ New Project</span>
            </a>
          </div>
        </div>

        {/* Section label */}
        <div className="fade-in stagger-2" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>
            Projects — 0 active
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
        </div>

        {/* Grid */}
        <div className="fade-in stagger-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          
          <a href="/x">
          <div
            className="create-card"
            onMouseEnter={() => setHoveredCard('new')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ position: 'relative' }}
          >
            <div className="corner-accent corner-tl" />
            <div className="corner-accent corner-tr" />
            <div className="corner-accent corner-bl" />
            <div className="corner-accent corner-br" />

            <div className="icon-wrap">
              <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
              </svg>
            </div>

            <h3 className="card-title" style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              margin: '0 0 8px',
              transition: 'color 0.3s ease',
            }}>
              Create New Project
            </h3>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.4)',
              margin: 0,
              letterSpacing: '0.05em',
              fontFamily: "'DM Mono', monospace",
            }}>
              init new generation
            </p>

            {/* Animated dash border overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '1px dashed rgba(180,80,255,0.2)',
              clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)',
              pointerEvents: 'none',
              opacity: hoveredCard === 'new' ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }} />
          </div></a>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '80px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', fontFamily: "'DM Mono', monospace" }}>
            SYS.OK — v0.1.0
          </span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace" }}>
            {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}