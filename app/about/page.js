export default function About() {
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

        .about-wrap {
          min-height: 100vh;
          background: var(--ink);
          color: var(--cream);
          font-family: 'DM Mono', monospace;
          padding: 120px 32px 100px;
        }

        /* ── HERO ── */
        .about-hero {
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
          margin-bottom: 100px;
        }

        .about-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.8rem, 7vw, 5rem);
          letter-spacing: -3px;
          line-height: 1.05;
          color: var(--accent);
          margin-bottom: 24px;
        }

        .about-hero p {
          font-size: 0.92rem;
          color: var(--muted);
          line-height: 1.9;
          max-width: 480px;
          margin: 0 auto;
          letter-spacing: 0.02em;
        }

        /* ── GRID ── */
        .about-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
          .about-wrap { padding: 100px 24px 80px; }
        }

        /* Vision card */
        .vision-card {
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 48px 40px;
          background: #111009;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .vision-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(600px circle at 0% 0%, rgba(108,71,255,0.08), transparent);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .vision-card:hover::before  { opacity: 1; }
        .vision-card:hover { border-color: rgba(200,240,58,0.25); }

        .vision-card h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--cream);
          letter-spacing: -0.5px;
          margin-bottom: 16px;
        }

        .vision-card p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.9;
          letter-spacing: 0.02em;
        }

        /* Tech col */
        .tech-col h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--accent);
          letter-spacing: -0.5px;
          margin-bottom: 16px;
        }

        .tech-col > p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.9;
          letter-spacing: 0.02em;
          margin-bottom: 32px;
        }

        .tech-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .tech-list li {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.82rem;
          color: var(--cream);
          letter-spacing: 0.04em;
        }

        .tech-list li::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          flex-shrink: 0;
        }

        .tech-list li.green::before  { background: #4ade80; }
        .tech-list li.blue::before   { background: #60a5fa; }
        .tech-list li.pink::before   { background: #f472b6; }
      `}</style>

      <div className="about-wrap">

        {/* Hero */}
        <div className="about-hero">
          <h1>About Criar</h1>
          <p>We are on a mission to democratize web development.</p>
        </div>

        {/* Grid */}
        <div className="about-grid">

          {/* Vision card */}
          <div className="vision-card">
            <h3>Our Vision</h3>
            <p>
              To provide everyone, regardless of technical skill, the ability to create
              beautiful, functional websites in minutes.
            </p>
          </div>

          {/* Tech col */}
          <div className="tech-col">
            <h3>The Technology</h3>
            <p>
              Criar leverages state-of-the-art Large Language Models fine-tuned on
              thousands of high-quality web templates. Our engine understands design
              nuances and functional requirements to deliver code that just works.
            </p>
            <ul className="tech-list">
              <li className="green">Optimized for clean, semantic HTML5</li>
              <li className="blue">Modern, responsive CSS generation</li>
              <li className="pink">Interactive JavaScript functionality</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}