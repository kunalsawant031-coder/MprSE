"use client"
import React, { useState, useEffect, useRef } from 'react';

const CreateGen = () => {
  const [projectType, setProjectType] = useState('Portfolio');
  const [prompt, setPrompt] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [videoSources, setVideoSources] = useState(['videos/portfolio.mp4', null]);

  // ── Generation states ──────────────────────────────────────────────────────
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null); // { html, css, js }
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(100);

  // ── Result view states ─────────────────────────────────────────────────────
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'
  const [activeCodeTab, setActiveCodeTab] = useState('html');
  const [responsiveMode, setResponsiveMode] = useState('desktop');
  const [refinementInput, setRefinementInput] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const categorySettings = {
    "Portfolio": {
      color: "shadow-[#00bfff] border-[#00bfff]",
      accentText: "text-[#00bfff]",
      btn: "bg-gradient-to-r from-[#00bfff] to-blue-600",
      placeholder: "Build a modern developer portfolio with bento grid, dark theme, and animated skill badges...",
      video: "videos/portfolio.mp4",
      bg: "bg-slate-950/70"
    },
    "Restaurant": {
      color: "shadow-orange-500 border-orange-600",
      accentText: "text-orange-400",
      btn: "bg-gradient-to-r from-orange-500 to-red-600",
      placeholder: "Create a fine-dining restaurant website with cinematic hero and reservation system...",
      video: "restaurant.mp4",
      bg: "bg-orange-950/80"
    },
    "E-commerce": {
      color: "shadow-cyan-400 border-cyan-400",
      accentText: "text-cyan-400",
      btn: "bg-gradient-to-r from-cyan-400 to-emerald-500",
      placeholder: "Build a minimal lifestyle brand online store with product grid and cart...",
      video: "ecommerce.mp4",
      bg: "bg-cyan-950/40"
    },
    "Blog": {
      color: "shadow-purple-500/50 border-purple-500",
      accentText: "text-purple-400",
      btn: "bg-gradient-to-r from-purple-500 to-indigo-600",
      placeholder: "Design a minimal editorial blog with featured posts and newsletter signup...",
      video: "videos/blog.mp4",
      bg: "bg-slate-900/80"
    },
    "Event": {
      color: "shadow-pink-500/50 border-pink-500",
      accentText: "text-pink-400",
      btn: "bg-gradient-to-r from-pink-500 to-rose-600",
      placeholder: "Create a music festival event page with countdown timer and ticket booking...",
      video: "videos/event.mp4",
      bg: "bg-slate-900/80"
    },
    "Gym": {
      color: "shadow-none border-white",
      accentText: "text-white",
      btn: "bg-white text-black hover:bg-gray-200",
      placeholder: "Build a powerful gym website with membership plans and class schedules...",
      video: "gym.mp4",
      bg: "bg-black/90"
    },
    "Travel": {
      color: "shadow-none border-blue-400",
      accentText: "text-blue-500",
      btn: "bg-gradient-to-b from-sky-400 to-blue-500",
      placeholder: "Design a luxury travel agency site with destination cards and curated packages...",
      video: "travel.mp4",
      bg: "bg-sky-900/40"
    },
    "Startup": {
      color: "shadow-cyan-500/30 border-cyan-400",
      accentText: "text-cyan-400",
      btn: "bg-gradient-to-r from-cyan-400 to-blue-500",
      placeholder: "Create a SaaS startup landing page with feature grid and 3-tier pricing...",
      video: "videos/startup.mp4",
      bg: "bg-slate-950/70"
    },
    "Education": {
      color: "shadow-none border-amber-800",
      accentText: "text-amber-200",
      btn: "bg-amber-900 text-amber-50",
      placeholder: "Build a learning platform with course cards, instructor profiles, and enrollment CTA...",
      video: "education.mp4",
      bg: "bg-[#2b1f18]"
    },
    "Photography": {
      color: "shadow-none border-[#8fd694]",
      accentText: "text-[#8fd694]",
      btn: "bg-[#8fd694] text-black",
      placeholder: "Create a photography portfolio with masonry gallery and services section...",
      video: "photography.mp4",
      bg: "bg-green-950/20"
    }
  };

  const current = categorySettings[projectType] || categorySettings["Portfolio"];

  // ── Video crossfade on category change ────────────────────────────────────
  useEffect(() => {
    const nextIndex = activeVideoIndex === 0 ? 1 : 0;
    setVideoSources(prev => {
      const newSources = [...prev];
      newSources[nextIndex] = current.video;
      return newSources;
    });
    setActiveVideoIndex(nextIndex);
  }, [projectType]);

  // ─── Parser ───────────────────────────────────────────────────────────────────
  function parseCodeBlocks(text) {
    // Strip any markdown fences
    const cleaned = text.replace(/```[\w]*\n?/g, '').replace(/```/g, '');

    const extract = (marker) => {
      // Handle ===HTML===, ### HTML ###, or just HTML:
      const regex = new RegExp(`(?:===|###|\\*\\*|)?${marker}(?:===|###|\\*\\*|:)?\\s*([\\s\\S]*?)(?====|###|\\*\\*|[A-Z]+===|===END===|$)`, 'i');
      const match = cleaned.match(regex);
      return match?.[1]?.trim() || '';
    };

    const html = extract('HTML');
    const css = extract('CSS');
    let js = extract('JS');

    console.log(`[CreateGen] Parse complete. HTML: ${html.length} chars, CSS: ${css.length} chars, JS: ${js.length} chars.`);

    if (!html) {
      console.error('[CreateGen] Parser failed to find HTML block. Searching for any code-like block...');
      // Last ditch effort: if markers failed, look for any large block
      const fallbackMatch = cleaned.match(/([\s\S]+)/);
      if (fallbackMatch && fallbackMatch[0].length > 100) return { html: fallbackMatch[0], css: '', js: '' };
      throw new Error('AI did not return code in the expected format. Please try again.');
    }
    return { html, css, js };
  }

  // ── Sync credits from cookie ───────────────────────────────────────────────
  useEffect(() => {
    const match = document.cookie.match(/user-credits=(\d+)/);
    if (match) setCredits(parseInt(match[1], 10));
  }, [isGenerating, isRefining]);

  // ── Generate initial ──────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: projectType, prompt, mode: 'initial' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setGeneratedCode({ html: data.html, css: data.css, js: data.js });
      if (data.creditsRemaining !== undefined) setCredits(data.creditsRemaining);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Refine existing code ──────────────────────────────────────────────────
  const handleRefine = async () => {
    if (!refinementInput.trim()) return;
    setIsRefining(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: projectType,
          prompt,
          mode: 'refinement',
          currentCode: generatedCode,
          refinementInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Refinement failed');
      setGeneratedCode({ html: data.html, css: data.css, js: data.js });
      if (data.creditsRemaining !== undefined) setCredits(data.creditsRemaining);
      setRefinementInput('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRefining(false);
    }
  };

  // ── Download all files ────────────────────────────────────────────────────
  const handleDownload = () => {
    if (!generatedCode) return;
    const { html, css, js } = generatedCode;

    const downloadFile = (content, filename, type = 'text/plain') => {
      const element = document.createElement("a");
      const file = new Blob([content], { type });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };

    // Full HTML wrap for index.html referencing external files
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectType} Website</title>
    <style>
        /* Base styles to ensure pages work even if CSS fails to load */
        .page { display: none; }
        .page.active { display: block; }
        body { margin: 0; padding: 0; }
    </style>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${html}
    <script src="script.js"></script>
</body>
</html>`;

    downloadFile(fullHtml, 'index.html', 'text/html');
    if (css) downloadFile(css, 'style.css');
    if (js) downloadFile(js, 'script.js');
  };

  const buildSrcDoc = () => {
    if (!generatedCode) return '';
    const { html, css, js } = generatedCode;
    const safeJs = js ? js.replace(/<\/script>/gi, '<\\/script>') : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
        body { margin: 0; padding: 0; overflow-x: hidden; }
        .page { display: none; }
        .page.active { display: block !important; }
        ${css}
    </style>
    <script>
        // Preview Hash Shim: Helps iframe navigation stay in sync and prevents redirects
        window.addEventListener('click', (e) => {
            const a = e.target.closest('a');
            if (a) {
                const href = a.getAttribute('href');
                if (!href || href.startsWith('http') || href.startsWith('mailto')) return;
                
                e.preventDefault();
                let targetPage = href;
                if (!href.startsWith('#')) {
                    targetPage = '#' + (href.split('/').pop().replace('.html', '') || 'home');
                }
                
                if (targetPage.length > 1) {
                    setTimeout(() => {
                        window.location.hash = targetPage;
                        window.dispatchEvent(new Event('hashchange'));
                    }, 10);
                }
            }
        });
    </script>
</head>
<body>
    ${html}
    <script>${safeJs}<\/script>
</body>
</html>`;
  };

  // ── Chatbot ───────────────────────────────────────────────────────────────
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'ai',
        text: `As a ${projectType} expert, I'm analyzing your request. Try describing specific sections, color schemes, or features you want!`
      }]);
    }, 600);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULT VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  if (generatedCode) {
    return (
      <div className=" inset-0 bg-slate-950 text-white flex flex-col font-sans">

        {/* Toolbar */}
        <div className="h-14 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setGeneratedCode(null)}
            className="text-sm text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-xl hover:bg-white/5 flex items-center gap-1"
          >
            ← Back
          </button>
          <div className="h-5 w-px bg-white/10" />
          <span className={`text-xs font-bold uppercase tracking-widest ${current.accentText}`}>
            {projectType}
          </span>
          <div className="flex-1" />

          {/* Preview / Code toggle */}
          <div className="flex bg-white/5 rounded-xl p-1 gap-0.5">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'preview' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
            >
              👁 Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'code' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
            >
              {'</>'} Code
            </button>
          </div>

          {/* Responsive (preview only) */}
          {viewMode === 'preview' && (
            <div className="hidden md:flex bg-white/5 rounded-xl p-1 gap-0.5">
              {[{ id: 'mobile', label: '📱' }, { id: 'tablet', label: '⬛' }, { id: 'desktop', label: '🖥' }].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setResponsiveMode(id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${responsiveMode === id ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Credits */}
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-white/50">{credits}</span>
          </div>

          {/* Download */}
          <button
            onClick={handleDownload}
            className={`${current.btn} px-4 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95`}
          >
            ↓ Download
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">

          {/* Refinement Sidebar */}
          <div className="w-72 border-r border-white/5 bg-black/30 flex flex-col shrink-0">
            <div className="p-5 flex-1 overflow-y-auto">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">✦ Refine Design</p>
              <textarea
                value={refinementInput}
                onChange={(e) => setRefinementInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleRefine(); }}
                placeholder={"Describe changes...\n\ne.g. 'Make the hero dark navy with a starfield' or 'Add a testimonials section'"}
                className="w-full h-36 bg-white/5 border border-white/5 rounded-2xl p-3.5 text-sm outline-none focus:border-white/20 transition-all resize-none placeholder-white/20 text-white"
              />
              <button
                onClick={handleRefine}
                disabled={isRefining || !refinementInput.trim()}
                className={`w-full mt-3 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${current.btn}`}
              >
                {isRefining
                  ? <><span className="animate-spin">↻</span> Updating...</>
                  : <>⚡ Apply Changes</>
                }
              </button>
              <p className="text-center text-[10px] text-white/20 mt-2">⌘↵ to apply</p>

              {error && (
                <div className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Quick refinement chips */}
              <div className="mt-5">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Quick Edits</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    'Change color scheme to dark navy',
                    'Add smooth scroll animations',
                    'Make navbar sticky with blur',
                    'Add a contact form',
                    'Improve mobile layout',
                  ].map(s => (
                    <button
                      key={s}
                      onClick={() => setRefinementInput(s)}
                      className="text-left px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Credits bar */}
            <div className="p-4 border-t border-white/5 shrink-0">
              <div className="flex justify-between text-[10px] font-mono text-white/20 mb-1.5">
                <span>CREDITS</span>
                <span className={current.accentText}>{credits} left</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${current.btn}`}
                  style={{ width: `${Math.min(100, credits)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Main Workspace */}
          <div className="flex-1 flex flex-col bg-[#0a0a10] relative overflow-hidden">
            {viewMode === 'preview' ? (
              <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
                <div
                  className="bg-white shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500"
                  style={{
                    width: responsiveMode === 'mobile' ? 390 : responsiveMode === 'tablet' ? 768 : '100%',
                    height: responsiveMode === 'mobile' ? 700 : responsiveMode === 'tablet' ? '90%' : '100%',
                    maxWidth: '100%', maxHeight: '100%',
                    borderRadius: responsiveMode === 'desktop' ? 0 : 20,
                    border: responsiveMode === 'desktop' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <iframe
                    srcDoc={buildSrcDoc()}
                    className="w-full h-full border-none"
                    title="Website Preview"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-modals allow-popups"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center gap-1 px-5 py-2 border-b border-white/5 shrink-0">
                  {[
                    { id: 'html', label: 'HTML', color: '#f472b6' },
                    { id: 'css', label: 'CSS', color: '#22d3ee' },
                    { id: 'js', label: 'JS', color: '#facc15' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCodeTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCodeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: tab.color }} />
                      {tab.label}
                      <span className="opacity-30 font-mono text-[10px]">{generatedCode[tab.id]?.split('\n').length || 0}L</span>
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedCode[activeCodeTab] || '')}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white/40 hover:text-white transition-all"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex-1 overflow-auto">
                  <pre className="p-5 text-xs font-mono leading-relaxed text-slate-300 whitespace-pre-wrap">
                    {generatedCode[activeCodeTab] || '// empty'}
                  </pre>
                </div>
              </div>
            )}

            {/* Refining overlay */}
            {isRefining && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
                <div className="text-5xl animate-spin">✦</div>
                <p className="text-xl font-bold tracking-widest animate-pulse">Refining Vision...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUT VIEW — original design, untouched
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-sans selection:bg-white/20">

      {/* 🎬 Video Backgrounds */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {videoSources.map((src, idx) => (
          <video
            key={`${idx}-${src}`}
            autoPlay muted loop playsInline src={src}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${activeVideoIndex === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      {/* 🌑 Global Dark Overlay */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25),rgba(0,0,0,0.55))]" />

      <div className="relative z-10 max-w-[1100px] mx-auto pt-24 pb-20 px-5 text-center">

        <h1 className="text-5xl md:text-7xl font-semibold mb-4 tracking-tight">
          Just imagine. <span className={`${current.accentText} transition-all duration-500 drop-shadow-lg`}>And we behold.</span>
        </h1>
        <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Describe your vision. CreateGen transforms it into pure HTML, CSS & JS.
        </p>

        {/* ⌨️ Input Box */}
        <div className={`p-8 rounded-[30px] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${current.bg} ${current.color}`}>
          <textarea
            className="w-full bg-transparent border-none text-white text-xl md:text-2xl resize-none outline-none h-28 placeholder-white/30"
            placeholder={current.placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
          />

          <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="bg-black/40 border border-white/20 px-5 py-2.5 rounded-full text-sm outline-none cursor-pointer hover:bg-black/60 transition-colors text-white"
              >
                {Object.keys(categorySettings).map(cat => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
                ))}
              </select>

              {/* Credits pill */}
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded-full border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-white/40">{credits} credits</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`${current.btn} px-10 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              {isGenerating
                ? <><span className="animate-spin inline-block">↻</span> Building...</>
                : 'Build Now →'
              }
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

          {/* Generating hint */}
          {isGenerating && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/40">
              <span className="animate-pulse">Architecting your {projectType} website...</span>
            </div>
          )}
        </div>

        {/* 🎴 Category Grid */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.keys(categorySettings).map(cat => (
            <div
              key={cat}
              onClick={() => setProjectType(cat)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${projectType === cat
                ? `${current.color} bg-white/10 scale-105 z-10`
                : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-black/60'
                }`}
            >
              <h3 className={`text-sm font-bold uppercase tracking-wider ${projectType === cat ? current.accentText : 'text-white/60'}`}>
                {cat}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🤖 Chatbot */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all hover:rotate-12 hover:scale-110 ${current.btn}`}
        >
          {isChatOpen ? '✕' : '🤖'}
        </button>

        {isChatOpen && (
          <div className="absolute bottom-20 right-0 w-80 bg-zinc-950 rounded-3xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 animate-in fade-in slide-in-from-bottom-5">
            <div className={`${current.btn} p-4 font-bold flex justify-between items-center`}>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                CreateGen AI
              </span>
              <button onClick={() => setIsChatOpen(false)} className="hover:opacity-70 text-xl">✕</button>
            </div>

            <div className="p-5 h-72 overflow-y-auto text-sm space-y-4 bg-black/40">
              {chatMessages.length === 0 && (
                <p className="text-white/40 italic">Ask me anything about your {projectType}...</p>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={`inline-block px-4 py-2 rounded-2xl ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white/10 text-white/90 rounded-tl-none border border-white/5'
                    }`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex border-t border-white/10 bg-zinc-900 p-2">
              <input
                type="text"
                className="flex-1 bg-transparent p-3 text-sm outline-none text-white placeholder-white/30"
                placeholder="Message CreateGen..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className={`px-4 font-bold ${current.accentText} hover:opacity-80 transition-opacity`}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGen;