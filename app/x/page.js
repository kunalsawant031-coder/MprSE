"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';

const COMPONENT_BLOCKS = [
  {
    category: 'Layout',
    items: [
      { id: 'hero-split', icon: '⬛', label: 'Split Hero', prompt: 'Add a bold split-layout hero section with a large headline on the left and a visual/image on the right, with two CTA buttons and a subtle radial glow decoration' },
      { id: 'hero-centered', icon: '🎯', label: 'Centered Hero', prompt: 'Add a centered fullscreen hero with large display typography, supporting text, and a gradient CTA button' },
      { id: 'navbar-sticky', icon: '📌', label: 'Sticky Navbar', prompt: 'Upgrade the navbar to be sticky with a glassmorphism blur effect, smooth shadow on scroll, and animated mobile hamburger menu' },
      { id: 'footer-full', icon: '🔻', label: 'Full Footer', prompt: 'Replace the footer with a premium 4-column grid footer including brand description, navigation links, social media icons, and newsletter signup' },
    ]
  },
  {
    category: 'Sections',
    items: [
      { id: 'features-grid', icon: '⚡', label: 'Feature Grid', prompt: 'Add a features section with a 3-column grid of feature cards, each with an inline SVG icon, heading, and description' },
      { id: 'testimonials', icon: '💬', label: 'Testimonials', prompt: 'Add a testimonials section with 3 customer review cards, avatar initials, star ratings, and quoted testimonial text' },
      { id: 'pricing-table', icon: '💰', label: 'Pricing Table', prompt: 'Add a 3-tier pricing section with Starter/Pro/Enterprise plans, feature lists, and a highlighted recommended plan' },
      { id: 'stats-counters', icon: '📊', label: 'Stats Counter', prompt: 'Add an animated stats section with 4 large number counters that count up on scroll' },
      { id: 'cta-banner', icon: '📣', label: 'CTA Banner', prompt: 'Add a full-width conversion CTA banner with a compelling headline, supporting text, and a large animated gradient button' },
      { id: 'faq', icon: '❓', label: 'FAQ Accordion', prompt: 'Add an FAQ section with 5-6 accordion items that expand/collapse on click with smooth animation' },
      { id: 'team-grid', icon: '👥', label: 'Team Grid', prompt: 'Add a team section with a 4-column grid of team member cards showing photo, name, role, and social icons' },
      { id: 'gallery', icon: '🖼️', label: 'Photo Gallery', prompt: 'Add a masonry photo gallery section using Unsplash images with a hover overlay effect showing title and a view button' },
    ]
  },
  {
    category: 'Interactive',
    items: [
      { id: 'contact-form', icon: '✉️', label: 'Contact Form', prompt: 'Add a contact form section with name, email, subject, message fields and a submit button with a success toast notification' },
      { id: 'newsletter', icon: '📧', label: 'Newsletter', prompt: 'Add a newsletter signup section with an email input and subscribe button, with a success state animation' },
      { id: 'countdown', icon: '⏱️', label: 'Countdown', prompt: 'Add a live countdown timer section counting down to a date 30 days from now, with days/hours/minutes/seconds displays' },
      { id: 'tabs', icon: '🗂️', label: 'Tabbed Content', prompt: 'Add a tabbed content section with 3-4 tabs that switch content with a smooth fade transition' },
      { id: 'carousel', icon: '🎠', label: 'Carousel', prompt: 'Add a horizontal scrolling carousel with prev/next navigation arrows and 5+ cards that slide smoothly' },
    ]
  },
  {
    category: 'Style',
    items: [
      { id: 'dark-mode', icon: '🌙', label: 'Dark Mode', prompt: 'Add a dark/light mode toggle button to the navbar that switches the entire site theme with a smooth CSS transition' },
      { id: 'animations', icon: '✨', label: 'Scroll Animations', prompt: 'Add scroll-triggered fade-in and slide-up animations to all section headings and cards using IntersectionObserver' },
      { id: 'gradient-bg', icon: '🌈', label: 'Gradient Bg', prompt: 'Replace the plain background with an animated gradient mesh background using CSS keyframe animation' },
      { id: 'glassmorphism', icon: '🪟', label: 'Glass Cards', prompt: 'Convert all card components to use glassmorphism styling with backdrop-filter blur, subtle borders, and soft shadows' },
    ]
  },
];

const PREMADE_PROMPTS = {
  Portfolio: [
    "Build a dark futuristic developer portfolio for Alex Chen — deep navy + electric cyan, bento grid hero with animated typing effect, 3D tilt project cards on hover, neon glow skill bars that animate on scroll, and a terminal-style contact section with blinking cursor",
    "Create a brutalist UI/UX designer portfolio — stark black and white, oversized serif typography, full-bleed project case study grid with diagonal section breaks, color-block hover states, and a custom cursor that morphs on hover",
    "Design an award-winning creative portfolio with split-screen hero where text scrolls left and sticky image morphs right, magnetic hover buttons, smooth curtain wipe page transitions, and a floating ambient particle background",
    "Build a retro-futuristic 90s web portfolio — CRT scanline overlay, glitch text animation on hero name, neon green on black terminal aesthetic, pixel grid background, and VHS-style section transitions",
  ],
  Restaurant: [
    "Create a Michelin-star fine dining site — full-screen cinematic hero with dark overlay, ink-black background with gold leaf accents, Playfair Display typography, parallax menu section reveal, chef story with dramatic photography, and an animated reservation form with date picker",
    "Build a moody Japanese omakase restaurant — deep charcoal with warm amber, minimalist generous whitespace, animated ink brush stroke SVG section dividers, seasonal tasting menu with elegant fade transitions, and haiku-inspired copy",
    "Design a vibrant upscale Mexican restaurant — warm terracotta + hand-drawn texture overlays, bold illustrated hero, dish cards that flip on hover showing ingredients, spicy gradient CTA, and a rooftop ambience gallery",
    "Create a modern rooftop bar & grill — midnight blue fading to sunset gradient, parallax city skyline hero, cocktail menu with shimmer hover cards, live events section with glowing neon sign aesthetic, and a reservation countdown",
  ],
  "E-commerce": [
    "Build a luxury skincare brand store — cream and sage green editorial layout, full-bleed hero with floating ingredient callouts, product grid with soft hover zoom, ingredient transparency timeline section, and a slide-in cart panel with upsell recommendations",
    "Create a bold streetwear drop store — pure black with electric yellow, hype countdown timer for next drop, product grid with sold-out states and size selectors, real-time stock update badges, and a graffiti texture dark culture aesthetic",
    "Design a premium specialty coffee subscription store — warm espresso browns, illustrated bean-to-cup journey section, subscription plan comparison cards, flavor profile wheel hover animation, and a pour-over process timeline",
    "Build a minimalist Scandinavian furniture store — pure white with oak wood texture accents, full-room lifestyle photography, room visualizer teaser, product cards with dimension specs, and a 4-column grid with depth shadows",
  ],
  Blog: [
    "Create a dark editorial tech blog — slate background with neon cyan link accents, magazine-style featured post hero, floating category pill filters, reading time + scroll progress bar on each card, and an animated newsletter with confetti on subscribe",
    "Build a warm personal storytelling blog — off-white linen texture, hand-lettered serif headings, oversized pull-quote callouts, polaroid-style photo inserts, and a cozy book-club aesthetic with amber accent highlights",
    "Design a futuristic AI/tech news blog — black background with holographic gradient headings, animated data visualization hero, article cards with live view counters, trending section with pulse animation, and dark glassmorphism card layout",
    "Create a vibrant travel photography blog — full-bleed world map hero, destination cards with country overlay names, passport stamp filter animations by region, story-format photo essays, and warm sunset editorial tones throughout",
  ],
  Event: [
    "Build a music festival landing page — deep black with electric neon pink + purple gradients, massive Bebas Neue hero, animated live countdown with glow rings, artist lineup grid with hover card reveals, tiered ticket pricing with shimmer effect, and a scroll-reactive pulsing background",
    "Create a luxury tech conference site — dark slate with brushed gold accents, speaker grid with hover biography reveals, color-coded schedule accordion by track, venue section with interactive map embed, and early-bird ticket countdown with urgency styling",
    "Design a rave/club night event page — pure black with ultraviolet neon, animated laser beam SVG background, DJ lineup with vinyl record spin on hover, door time countdown, ticket quantity selector with live price calculator",
    "Build a charity gala event site — deep navy with champagne gold typography, elegant Cormorant serif, sponsor logo marquee scroll, table booking with guest count selector, and a fundraising thermometer progress bar with animated live counter",
  ],
  Gym: [
    "Build an elite CrossFit gym — pure black + neon yellow, Barlow Condensed uppercase everything, split hero with athlete photography, daily WOD section with collapsible details, membership tiers with punch-through hover animation, and a before/after transformation slider gallery",
    "Create a luxury wellness studio — warm white with sage green + gold, flowing organic shapes, filterable class schedule by discipline, instructor cards with specialty tags, membership cost calculator, and a calming parallax hero with soft overlay",
    "Design a boxing gym site — dark charcoal + crimson red, oversized impact typography, punching bag sway animation on CTA hover, fight event schedule calendar, gym tour video embed section, and an aggressive motivational quote ticker",
    "Build a 24/7 modern fitness chain — midnight navy + electric blue, interactive class booking prototype, real-time membership slot availability, progress tracking dashboard preview, and location finder with animated map pins",
  ],
  Travel: [
    "Create a luxury travel agency — deep ocean navy to horizon blue gradient, Fraunces serif headings, parallax destination hero, search bar with destination/dates/travelers inputs, curated journey cards with price reveal on hover, and a bucket-list inspiration section with staggered animations",
    "Build a minimalist adventure travel site — raw earth tones, full-screen landscape photography heroes, destination filter by continent with animated transitions, trek difficulty badges, real traveler testimonials with country flags, and a packing list accordion",
    "Design an immersive city guide — clean white with bold accent color per city, interactive city selector with map preview, neighborhood cards with clickable overlays, food/stay/do tabbed content per city, and a weekend itinerary builder",
    "Create a yacht charter luxury site — navy and white with gold trim, full-screen ocean hero with animated wave SVG, fleet gallery with boat spec comparison cards, destination route map, and a booking inquiry form with calendar date picker",
  ],
  Startup: [
    "Build a dark SaaS landing page — slate + emerald gradient, animated hero with floating mock UI dashboard panels, staggered feature grid reveal, pricing toggle monthly/yearly with savings badge, social proof logo marquee, animated number counters, and a waitlist form with confetti burst on submit",
    "Create a fintech startup site — deep navy + gold trust signals, security badge section, product demo video with play overlay, 3-step onboarding explainer with step animations, investor logos grid, and a clean pricing table with feature comparison checkmarks",
    "Design an AI startup landing page — dark with glowing gradient orb hero animation, animated neural network SVG background, feature cards that illuminate on hover, real-time demo widget teaser, customer case studies with ROI percentages, and a Product Hunt badge",
    "Build a B2B project management SaaS — professional slate theme, split hero with animated product screenshot, integration partner logos grid, workflow animation showing tool in use, enterprise pricing table, and a free trial CTA with trust signals",
  ],
  Education: [
    "Create a premium online learning platform — warm amber + deep brown parchment aesthetic, featured course hero with enrollment counter, progress ring course cards, instructor spotlight section, student testimonials with university badges, and a scholarship CTA section",
    "Build a coding bootcamp site — dark + neon green terminal accents, animated typing code hero, curriculum accordion with week-by-week breakdown, alumni salary outcome stats, cohort start date countdown timer, and an ISA payment calculator",
    "Design a kids learning app landing page — bright coral + sky blue, playful rounded chunky typography, animated bouncing mascot character, subject cards with hover bounce icons, parent testimonials with star ratings, and a colorful pricing section with free trial",
    "Create a university program site — institutional navy + gold, faculty profiles grid with research tags, accreditation badge section, application deadline countdown, campus life photo masonry gallery, and a program comparison table",
  ],
  Photography: [
    "Build a cinematic wedding photography portfolio — near-black + warm gold, full-screen masonry gallery with film burn hover overlay, pricing packages section with elegant cards, couple testimonials with wedding dates + venues, Instagram grid teaser, and an availability inquiry form with calendar",
    "Create a moody portrait photographer site — deep charcoal + sage green, horizontal scroll gallery with full-bleed images, behind-the-scenes process section, darkroom film grain overlay aesthetic, and a session booking widget with type selector",
    "Design a commercial photography studio — clean white + bold black, brand client logo wall, project case study grid filterable by industry, studio rental section with hourly pricing and amenities, and a contact form with project brief dropdown options",
    "Build a landscape photographer portfolio — deep ocean blue + golden hour accents, interactive world map with shooting location pins, limited edition print shop with size selector + price calculator, print drop countdown, and a newsletter for new collection launches",
  ],
};

const categorySettings = {
  "Portfolio": {
    color: "shadow-[#00bfff] border-[#00bfff]", accentText: "text-[#00bfff]",
    btn: "bg-gradient-to-r from-[#00bfff] to-blue-600",
    placeholder: "Build a dark futuristic developer portfolio with bento grid and neon glow effects...",
    video: "videos/portfolio.mp4", bg: "bg-slate-950/70"
  },
  "Restaurant": {
    color: "shadow-orange-500 border-orange-600", accentText: "text-orange-400",
    btn: "bg-gradient-to-r from-orange-500 to-red-600",
    placeholder: "Create a Michelin-star fine dining site with cinematic hero and reservation form...",
    video: "restaurant.mp4", bg: "bg-orange-950/80"
  },
  "E-commerce": {
    color: "shadow-cyan-400 border-cyan-400", accentText: "text-cyan-400",
    btn: "bg-gradient-to-r from-cyan-400 to-emerald-500",
    placeholder: "Build a luxury skincare store with editorial photography and slide-in cart...",
    video: "ecommerce.mp4", bg: "bg-cyan-950/40"
  },
  "Blog": {
    color: "shadow-purple-500/50 border-purple-500", accentText: "text-purple-400",
    btn: "bg-gradient-to-r from-purple-500 to-indigo-600",
    placeholder: "Design a dark editorial tech blog with neon accents and magazine layout...",
    video: "videos/blog.mp4", bg: "bg-slate-900/80"
  },
  "Event": {
    color: "shadow-pink-500/50 border-pink-500", accentText: "text-pink-400",
    btn: "bg-gradient-to-r from-pink-500 to-rose-600",
    placeholder: "Create a music festival page with neon gradients, countdown and lineup grid...",
    video: "videos/event.mp4", bg: "bg-slate-900/80"
  },
  "Gym": {
    color: "shadow-none border-white", accentText: "text-white",
    btn: "bg-white text-black hover:bg-gray-200",
    placeholder: "Build an elite CrossFit gym site — black and neon yellow, transformation gallery...",
    video: "gym.mp4", bg: "bg-black/90"
  },
  "Travel": {
    color: "shadow-none border-blue-400", accentText: "text-blue-500",
    btn: "bg-gradient-to-b from-sky-400 to-blue-500",
    placeholder: "Design a luxury travel agency with parallax destinations and curated journeys...",
    video: "travel.mp4", bg: "bg-sky-900/40"
  },
  "Startup": {
    color: "shadow-cyan-500/30 border-cyan-400", accentText: "text-cyan-400",
    btn: "bg-gradient-to-r from-cyan-400 to-blue-500",
    placeholder: "Create a SaaS landing page with animated dashboard mockup and pricing toggle...",
    video: "videos/startup.mp4", bg: "bg-slate-950/70"
  },
  "Education": {
    color: "shadow-none border-amber-800", accentText: "text-amber-200",
    btn: "bg-amber-900 text-amber-50",
    placeholder: "Build a coding bootcamp site with curriculum accordion and alumni success stats...",
    video: "education.mp4", bg: "bg-[#2b1f18]"
  },
  "Photography": {
    color: "shadow-none border-[#8fd694]", accentText: "text-[#8fd694]",
    btn: "bg-[#8fd694] text-black",
    placeholder: "Create a cinematic wedding photography portfolio with masonry gallery...",
    video: "photography.mp4", bg: "bg-green-950/20"
  },
};

const CreateGen = () => {
  const [projectType, setProjectType] = useState('Portfolio');
  const [prompt, setPrompt] = useState('');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [videoSources, setVideoSources] = useState(['videos/portfolio.mp4', null]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(100);

  const [viewMode, setViewMode] = useState('preview');
  const [activeCodeTab, setActiveCodeTab] = useState('html');
  const [responsiveMode, setResponsiveMode] = useState('desktop');
  const [refinementInput, setRefinementInput] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const [editorMode, setEditorMode] = useState(false);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [addedBlocks, setAddedBlocks] = useState([]);
  const [activePanelCategory, setActivePanelCategory] = useState('Layout');

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatTab, setChatTab] = useState('prompts');
  const chatEndRef = useRef(null);
  const iframeRef = useRef(null);

  const current = categorySettings[projectType] || categorySettings["Portfolio"];
  const currentPrompts = PREMADE_PROMPTS[projectType] || [];

  useEffect(() => {
    const nextIndex = activeVideoIndex === 0 ? 1 : 0;
    setVideoSources(prev => {
      const updated = [...prev];
      updated[nextIndex] = current.video;
      return updated;
    });
    setActiveVideoIndex(nextIndex);
  }, [projectType]);

  useEffect(() => {
    const match = document.cookie.match(/user-credits=(\d+)/);
    if (match) setCredits(parseInt(match[1], 10));
  }, [isGenerating, isRefining]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setAddedBlocks([]);
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

  const handleRefine = async (customPrompt) => {
    const inp = customPrompt || refinementInput;
    if (!inp.trim()) return;
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
          refinementInput: inp,
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

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (!dragging) return;
    const block = dragging;
    setDragging(null);
    setAddedBlocks(prev => [...prev, block.id]);
    handleRefine(block.prompt);
  }, [dragging]);

  const handleDownload = () => {
    if (!generatedCode) return;
    const { html, css, js } = generatedCode;
    const dl = (content, filename, type = 'text/plain') => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([content], { type }));
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    dl(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${projectType}</title><style>.page{display:none}.page.active{display:block}body{margin:0}</style><link rel="stylesheet" href="style.css"></head><body>${html}<script src="script.js"><\/script></body></html>`, 'index.html', 'text/html');
    if (css) dl(css, 'style.css');
    if (js) dl(js, 'script.js');
  };

  const buildSrcDoc = () => {
    if (!generatedCode) return '';
    const { html, css, js } = generatedCode;
    const safeJs = (js || '').replace(/<\/script>/gi, '<\\/script>');
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preview</title><style>*{box-sizing:border-box}body{margin:0;padding:0;overflow-x:hidden}.page{display:none}.page.active{display:block !important}${css}</style><script>window.addEventListener('click',function(e){var a=e.target.closest('a');if(a){var h=a.getAttribute('href');if(!h||h.startsWith('http')||h.startsWith('mailto'))return;e.preventDefault();var t=h.startsWith('#')?h:'#'+(h.split('/').pop().replace('.html','')||'home');setTimeout(function(){window.location.hash=t;window.dispatchEvent(new Event('hashchange'));},10);}});<\/script></head><body>${html}<script>${safeJs}<\/script></body></html>`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setChatInput('');
    setTimeout(() => {
      const lower = msg.toLowerCase();
      let reply = '';
      if (lower.includes('color') || lower.includes('theme') || lower.includes('palette'))
        reply = 'Dark backgrounds with a single neon accent (cyan, emerald, pink) always look premium. Try specifying exact hex codes in your prompt for precise control.';
      else if (lower.includes('font') || lower.includes('typography'))
        reply = 'Pair a display serif (Playfair Display, Fraunces, Cormorant) with a clean sans-serif for body — instant visual hierarchy without a single extra line of effort.';
      else if (lower.includes('animation') || lower.includes('motion') || lower.includes('effect'))
        reply = 'Scroll-triggered stagger animations win every time. Add "with IntersectionObserver fade-up animations staggered 100ms per card" to any prompt for that polished feel.';
      else if (lower.includes('layout') || lower.includes('section') || lower.includes('hero'))
        reply = 'The winning formula: Split hero → Feature grid → Social proof → CTA banner → Footer. Each section in the prompt templates follows this exact conversion-optimized structure.';
      else if (lower.includes('image') || lower.includes('photo') || lower.includes('unsplash'))
        reply = 'All images come from Unsplash. Describe the vibe in your prompt — "moody", "luxury", "bright editorial" — and the AI picks matching photo IDs automatically.';
      else if (lower.includes('mobile') || lower.includes('responsive'))
        reply = 'Use the 📱 tablet/mobile buttons in the toolbar to preview. Add "with fully responsive mobile layout and hamburger menu" to your prompt for best results.';
      else
        reply = `Check the Prompts tab — all ${projectType} templates are engineered for trending, high-quality output with specific animations and layout patterns built in.`;
      setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 600);
  };

  // ── RESULT VIEW ─────────────────────────────────────────────────────────────
  if (generatedCode) {
    return (
      <div className="bg-slate-950 text-white flex flex-col font-sans" style={{ height: '100vh', overflow: 'hidden' }}>
        {/* Toolbar */}
        <div className="h-14 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 flex items-center gap-3 shrink-0 z-50">
          <button onClick={() => setGeneratedCode(null)} className="text-sm text-white/50 hover:text-white px-3 py-1.5 rounded-xl hover:bg-white/5 flex items-center gap-1 transition-colors">
            ← Back
          </button>
          <div className="h-5 w-px bg-white/10" />
          <span className={`text-xs font-bold uppercase tracking-widest ${current.accentText}`}>{projectType}</span>
          <div className="flex-1" />
          <div className="flex bg-white/5 rounded-xl p-1 gap-0.5">
            <button onClick={() => { setViewMode('preview'); setEditorMode(false); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'preview' && !editorMode ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>👁 Preview</button>
            <button onClick={() => { setViewMode('preview'); setEditorMode(true); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${editorMode ? 'bg-violet-500 text-white' : 'text-white/50 hover:text-white'}`}>🎨 Editor</button>
            <button onClick={() => { setViewMode('code'); setEditorMode(false); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'code' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>{'</>'} Code</button>
          </div>
          {viewMode === 'preview' && !editorMode && (
            <div className="hidden md:flex bg-white/5 rounded-xl p-1 gap-0.5">
              {[{ id: 'mobile', label: '📱' }, { id: 'tablet', label: '⬛' }, { id: 'desktop', label: '🖥' }].map(({ id, label }) => (
                <button key={id} onClick={() => setResponsiveMode(id)} className={`px-3 py-1.5 rounded-lg text-xs transition-all ${responsiveMode === id ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}>{label}</button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-white/50">{credits}</span>
          </div>
          <button onClick={handleDownload} className={`${current.btn} px-4 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95`}>↓ Download</button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Editor panel */}
          {editorMode && (
            <div className="w-60 border-r border-white/5 bg-black/40 flex flex-col shrink-0 overflow-hidden">
              <div className="p-3 border-b border-white/5">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">🎨 Components</p>
                <p className="text-[10px] text-white/20 mt-0.5">Drag onto canvas or Quick Add</p>
              </div>
              <div className="flex gap-1 p-2 border-b border-white/5 flex-wrap">
                {COMPONENT_BLOCKS.map(cat => (
                  <button key={cat.category} onClick={() => setActivePanelCategory(cat.category)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${activePanelCategory === cat.category ? 'bg-violet-500 text-white' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
                    {cat.category}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {COMPONENT_BLOCKS.find(c => c.category === activePanelCategory)?.items.map(block => (
                  <div key={block.id} draggable
                    onDragStart={() => setDragging(block)}
                    onDragEnd={() => { if (!dragOver) setDragging(null); }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-grab active:cursor-grabbing transition-all select-none
                      ${addedBlocks.includes(block.id) ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5 hover:bg-white/5 hover:border-white/15'}
                      ${dragging?.id === block.id ? 'opacity-40 scale-95' : ''}`}>
                    <span className="text-base">{block.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white/70 truncate">{block.label}</p>
                      {addedBlocks.includes(block.id) && <p className="text-[9px] text-emerald-400">✓ Added</p>}
                    </div>
                    <span className="text-white/20 text-xs">⠿</span>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-white/5">
                <p className="text-[10px] text-white/20 mb-2 font-bold uppercase tracking-widest">⚡ Quick Add</p>
                <div className="grid grid-cols-2 gap-1">
                  {COMPONENT_BLOCKS.find(c => c.category === activePanelCategory)?.items.slice(0, 4).map(block => (
                    <button key={block.id}
                      onClick={() => { setAddedBlocks(prev => [...prev, block.id]); handleRefine(block.prompt); }}
                      disabled={isRefining}
                      className="px-2 py-1.5 rounded-lg text-[10px] font-bold text-white/50 hover:text-white bg-white/3 hover:bg-violet-500/20 border border-white/5 hover:border-violet-500/30 transition-all disabled:opacity-30 text-left truncate">
                      {block.icon} {block.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Refinement sidebar */}
          {!editorMode && viewMode !== 'code' && (
            <div className="w-64 border-r border-white/5 bg-black/30 flex flex-col shrink-0">
              <div className="p-4 flex-1 overflow-y-auto">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">✦ Refine Design</p>
                <textarea
                  value={refinementInput}
                  onChange={(e) => setRefinementInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleRefine(); }}
                  placeholder={"Describe changes...\n\ne.g. 'Make hero dark navy with starfield'"}
                  className="w-full h-32 bg-white/5 border border-white/5 rounded-xl p-3 text-sm outline-none focus:border-white/20 transition-all resize-none placeholder-white/20 text-white"
                />
                <button onClick={() => handleRefine()} disabled={isRefining || !refinementInput.trim()}
                  className={`w-full mt-3 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${current.btn}`}>
                  {isRefining ? <><span className="animate-spin">↻</span> Updating...</> : <>⚡ Apply Changes</>}
                </button>
                <p className="text-center text-[10px] text-white/20 mt-1.5">⌘↵ to apply</p>
                {error && <div className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{error}</div>}
                <div className="mt-5">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Quick Edits</p>
                  <div className="flex flex-col gap-1">
                    {['Change color scheme to dark navy', 'Add smooth scroll animations', 'Make navbar sticky with blur', 'Add a contact form', 'Improve mobile layout', 'Add glassmorphism card effects'].map(s => (
                      <button key={s} onClick={() => setRefinementInput(s)} className="text-left px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white/70 hover:bg-white/5 transition-all">+ {s}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-white/5 shrink-0">
                <div className="flex justify-between text-[10px] font-mono text-white/20 mb-1.5">
                  <span>CREDITS</span><span className={current.accentText}>{credits} left</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${current.btn}`} style={{ width: `${Math.min(100, credits)}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Main workspace */}
          <div className="flex-1 flex flex-col bg-[#0a0a10] relative overflow-hidden">
            {editorMode && (
              <div className="px-4 py-2 border-b border-violet-500/20 bg-violet-500/5 flex items-center gap-2 shrink-0">
                <span className="text-violet-400 text-xs font-bold">🎨 Editor</span>
                <span className="text-white/30 text-xs">— Drag components from panel or use Quick Add</span>
                {isRefining && <span className="ml-auto text-xs text-violet-300 animate-pulse">⚡ Applying...</span>}
              </div>
            )}
            {viewMode === 'preview' ? (
              <div className={`flex-1 flex items-center justify-center p-4 overflow-hidden relative transition-colors ${dragOver ? 'bg-violet-500/10' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}>
                {dragging && (
                  <div className={`absolute inset-4 border-2 border-dashed rounded-2xl z-10 flex flex-col items-center justify-center pointer-events-none transition-all ${dragOver ? 'border-violet-400 bg-violet-500/15' : 'border-white/10'}`}>
                    {dragOver && (
                      <div className="text-center">
                        <div className="text-4xl mb-2">{dragging.icon}</div>
                        <p className="text-violet-300 font-bold text-lg">Drop to add {dragging.label}</p>
                        <p className="text-white/40 text-sm mt-1">AI will integrate this component</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="bg-white shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500"
                  style={{
                    width: responsiveMode === 'mobile' ? 390 : responsiveMode === 'tablet' ? 768 : '100%',
                    height: responsiveMode === 'mobile' ? 700 : responsiveMode === 'tablet' ? '90%' : '100%',
                    maxWidth: '100%', maxHeight: '100%',
                    borderRadius: responsiveMode === 'desktop' ? 0 : 20,
                    border: responsiveMode === 'desktop' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  }}>
                  <iframe ref={iframeRef} srcDoc={buildSrcDoc()} className="w-full h-full border-none" title="Preview"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-modals allow-popups" />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center gap-1 px-4 py-2 border-b border-white/5 shrink-0">
                  {[{ id: 'html', label: 'HTML', color: '#f472b6' }, { id: 'css', label: 'CSS', color: '#22d3ee' }, { id: 'js', label: 'JS', color: '#facc15' }].map(tab => (
                    <button key={tab.id} onClick={() => setActiveCodeTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCodeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}>
                      <span className="w-2 h-2 rounded-full" style={{ background: tab.color }} />
                      {tab.label} <span className="opacity-30 font-mono text-[10px]">{generatedCode[tab.id]?.split('\n').length || 0}L</span>
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button onClick={() => navigator.clipboard.writeText(generatedCode[activeCodeTab] || '')}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white/40 hover:text-white transition-all">Copy</button>
                </div>
                <div className="flex-1 overflow-auto">
                  <pre className="p-5 text-xs font-mono leading-relaxed text-slate-300 whitespace-pre-wrap">{generatedCode[activeCodeTab] || '// empty'}</pre>
                </div>
              </div>
            )}
            {isRefining && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
                <div className="text-5xl animate-spin">✦</div>
                <p className="text-xl font-bold tracking-widest animate-pulse">Refining Vision...</p>
                <p className="text-white/30 text-sm">AI is rewriting your website</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── INPUT VIEW ──────────────────────────────────────────────────────────────
return (
    <div className="relative min-h-screen w-full text-white overflow-x-hidden font-sans selection:bg-white/20">
      {/* Video BG */}
<div className="fixed top-0 left-0 w-screen h-screen -z-20 overflow-hidden">        {videoSources.map((src, idx) => (
          <video key={`${idx}-${src}`} autoPlay muted loop playsInline src={src}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${activeVideoIndex === idx ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
<div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.2),rgba(0,0,0,0.7))]" />
      {/* ─ FIXED: constrained width + proper scaling ─ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 pt-14 pb-20 text-center">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-3 tracking-tight leading-[1.1]">
          Just imagine.{' '}
          <span className={`${current.accentText} transition-all duration-500 drop-shadow-lg`}>
            And we behold.
          </span>
        </h1>
        <p className="text-white/45 text-sm sm:text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          Describe your vision. Criar turns it into HTML, CSS & JS — then refine with drag & drop.
        </p>

        {/* Input box */}
        <div className={`p-5 sm:p-6 rounded-[24px] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${current.bg} ${current.color}`}>
          <textarea
            className="w-full bg-transparent border-none text-white text-base sm:text-lg resize-none outline-none h-20 sm:h-24 placeholder-white/30 leading-relaxed"
            placeholder={current.placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
          />
          <div className="mt-4 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <select value={projectType} onChange={(e) => setProjectType(e.target.value)}
                className="bg-black/40 border border-white/20 px-4 py-2 rounded-full text-xs sm:text-sm outline-none cursor-pointer hover:bg-black/60 transition-colors text-white">
                {Object.keys(categorySettings).map(cat => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
                ))}
              </select>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-white/40">{credits} credits</span>
              </div>
            </div>
            <button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}
              className={`${current.btn} px-7 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2`}>
              {isGenerating ? <><span className="animate-spin inline-block">↻</span> Building...</> : 'Build Now →'}
            </button>
          </div>
          {error && <div className="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-2xl">{error}</div>}
          {isGenerating && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/35">
              <span className="animate-pulse">Architecting your {projectType} website...</span>
            </div>
          )}
        </div>

        {/* Feature pills */}
        <div className="mt-5 flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
          {['🎨 Drag & Drop Editor', '⚡ AI Refinement', '📱 Responsive Preview', '↓ Export Code'].map(f => (
            <span key={f} className="text-[11px] text-white/22">{f}</span>
          ))}
        </div>

        {/* Category grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {Object.keys(categorySettings).map(cat => (
            <div key={cat} onClick={() => setProjectType(cat)}
              className={`py-3.5 px-2 rounded-2xl cursor-pointer transition-all duration-300 border ${
                projectType === cat
                  ? `${current.color} bg-white/10 scale-105`
                  : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-black/60'
              }`}>
              <h3 className={`text-[11px] font-bold uppercase tracking-wider ${projectType === cat ? current.accentText : 'text-white/50'}`}>
                {cat}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chatbot ── */}
      <div className="fixed bottom-5 right-5 z-50">
        <button onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-13 h-13 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-2xl transition-all hover:scale-110 active:scale-95 ${current.btn}`}
          style={{ width: 52, height: 52 }}>
          {isChatOpen ? '✕' : '✦'}
        </button>

        {isChatOpen && (
          <div className="absolute bottom-14 right-0 w-80 bg-zinc-950 rounded-2xl overflow-hidden flex flex-col shadow-[0_24px_64px_rgba(0,0,0,0.65)] border border-white/10"
            style={{ maxHeight: '80vh' }}>

            {/* Header */}
            <div className={`${current.btn} px-4 py-3 flex items-center justify-between shrink-0`}>
              <span className="font-bold text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                CreateGen AI
              </span>
              <button onClick={() => setIsChatOpen(false)} className="hover:opacity-70 text-base leading-none">✕</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-black/20 shrink-0">
              <button onClick={() => setChatTab('prompts')}
                className={`flex-1 py-2.5 text-xs font-bold transition-all ${chatTab === 'prompts' ? 'text-white border-b-2 border-white' : 'text-white/30 hover:text-white/60'}`}>
                ✦ Prompt Ideas
              </button>
              <button onClick={() => setChatTab('chat')}
                className={`flex-1 py-2.5 text-xs font-bold transition-all ${chatTab === 'chat' ? 'text-white border-b-2 border-white' : 'text-white/30 hover:text-white/60'}`}>
                💬 Ask AI
              </button>
            </div>

            {/* Prompts tab */}
            {chatTab === 'prompts' && (
              <div className="overflow-y-auto p-3 space-y-2" style={{ maxHeight: 380 }}>
                <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold">
                  ✦ {projectType} — 4 Trending Prompts
                </p>
                {currentPrompts.map((p, i) => (
                  <div key={i}
                    onClick={() => { setPrompt(p); setIsChatOpen(false); }}
                    className="group p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/25 hover:bg-white/8 transition-all cursor-pointer">
                    <p className="text-[11px] text-white/55 group-hover:text-white/85 transition-colors leading-relaxed line-clamp-4">{p}</p>
                    <p className="text-[10px] text-white/20 group-hover:text-white/45 mt-2 transition-colors font-bold">Click to use this prompt →</p>
                  </div>
                ))}
              </div>
            )}

            {/* Chat tab */}
            {chatTab === 'chat' && (
              <>
                <div className="overflow-y-auto p-3 space-y-2.5 bg-black/20" style={{ maxHeight: 300 }}>
                  {chatMessages.length === 0 && (
                    <p className="text-white/25 text-xs italic leading-relaxed">
                      Ask about colors, fonts, animations, layouts... I'll help you craft the perfect prompt.
                    </p>
                  )}
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                      <span className={`inline-block px-3 py-2 rounded-xl text-xs leading-relaxed max-w-[88%] ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-white/8 text-white/80 rounded-tl-none border border-white/5'
                      }`}>{msg.text}</span>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="flex border-t border-white/10 bg-zinc-900/80 p-2 shrink-0">
                  <input type="text"
                    className="flex-1 bg-transparent px-2 py-1.5 text-xs outline-none text-white placeholder-white/25"
                    placeholder="Ask about colors, layout, animations..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                  <button onClick={handleSendMessage}
                    className={`px-3 font-bold text-xs ${current.accentText} hover:opacity-70 transition-opacity`}>
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGen;