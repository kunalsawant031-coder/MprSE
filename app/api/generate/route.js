// [AUDITED] CODE GENERATOR API - ROBUST VERSION
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// ─────────────────────────────────────────────────────────────────────────────
//  FREE AI PROVIDER OPTIONS (use whichever key you have in .env.local):
//
//  1. Google Gemini — RECOMMENDED (free: 15 req/min, 1500/day)
//     Get key: https://aistudio.google.com → Set GEMINI_API_KEY
//
//  2. Groq (Llama 3.3 70B) — Blazing fast, generous free tier
//     Get key: https://console.groq.com → Set GROQ_API_KEY
//
//  3. OpenRouter (DeepSeek, Llama, Mistral, etc.) — 200 free req/day
//     Get key: https://openrouter.ai → Set OPENROUTER_API_KEY
//     Free model list: https://openrouter.ai/models?q=free
// ─────────────────────────────────────────────────────────────────────────────

const CREDIT_COSTS = { initial: 5, refinement: 2 };

// ─── Per-category design DNA injected into every prompt ──────────────────────
const CATEGORY_DNA = {
    Portfolio: {
        palette: 'deep navy + electric cyan accent, dark mode UI',
        fonts: 'Syne (headings) + DM Sans (body)',
        mood: 'Creative developer — techy, sharp, impressive',
        mustHave: 'animated skill bars or bento grid, project cards with hover lift, GitHub/social links',
    },
    Restaurant: {
        palette: 'warm cream + deep terracotta, or midnight black with gold accents',
        fonts: 'Playfair Display (headings) + Lato (body)',
        mood: 'Luxurious, appetite-whetting, cinematic',
        mustHave: 'full-screen hero with food imagery, menu section with categories, reservation CTA',
    },
    'E-commerce': {
        palette: 'clean white + bold single accent color, product-forward layout',
        fonts: 'Cabinet Grotesk (headings) + Inter (body)',
        mood: 'Modern, conversion-focused, premium lifestyle brand',
        mustHave: 'product grid with hover zoom, cart icon in nav, featured collection hero',
    },
    Blog: {
        palette: 'off-white + charcoal or deep slate, high typographic contrast',
        fonts: 'DM Serif Display (headings) + Source Serif 4 (body)',
        mood: 'Editorial, thoughtful, typography-driven',
        mustHave: 'featured post hero, article card grid, category tags, newsletter signup',
    },
    Event: {
        palette: 'deep black + neon pink or electric purple gradient accents',
        fonts: 'Bebas Neue (headings) + Outfit (body)',
        mood: 'Electric, high-energy, FOMO-inducing',
        mustHave: 'live countdown timer (JS), lineup/speakers section, ticket CTA, date + location in hero',
    },
    Gym: {
        palette: 'pure black + white + one bold accent (yellow, red, or orange)',
        fonts: 'Barlow Condensed (headings) + Barlow (body)',
        mood: 'Raw power, intense, motivational',
        mustHave: 'full-screen hero with bold headline, membership pricing cards, class schedule grid',
    },
    Travel: {
        palette: 'sky blue gradient + warm sand tones, or deep ocean navy',
        fonts: 'Fraunces (headings) + Nunito (body)',
        mood: 'Dreamy, wanderlust, aspirational and inviting',
        mustHave: 'destination card grid with overlay text, search/filter bar in hero, featured trip section',
    },
    Startup: {
        palette: 'dark slate + cyan or emerald gradient accents',
        fonts: 'Space Grotesk (headings) + Inter (body)',
        mood: 'Modern SaaS, clean, trustworthy, growth-oriented',
        mustHave: 'animated feature grid with icons, 3-tier pricing table, social proof logos, waitlist hero',
    },
    Education: {
        palette: 'warm amber + deep brown, parchment and terracotta tones',
        fonts: 'Merriweather (headings) + Open Sans (body)',
        mood: 'Trustworthy, warm, knowledge-forward',
        mustHave: 'course cards grid, instructor profiles section, student testimonials, enrollment CTA',
    },
    Photography: {
        palette: 'near-black + sage green accent, film grain and muted aesthetic',
        fonts: 'Cormorant Garamond (headings) + Karla (body)',
        mood: 'Artistic, quiet confidence, gallery-quality presentation',
        mustHave: 'masonry photo grid, full-screen image hover, services/packages section, contact form',
    },
};

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Aetheris, an elite AI web architect. Your output is pure, working HTML/CSS/JS — no frameworks, no build steps. It runs directly in a browser.

==============================
ARCHITECTURE
==============================

- Output THREE separate code blocks: HTML (body only), CSS, JavaScript.
- Do NOT include <html>, <head>, <style>, or <script> wrapper tags.
- The site uses a hash-based SPA pattern.
- Each page = <section class="page" id="pageName">.
- CSS must include:
    .page { display: none; }
    .page.active { display: block; }

IMPORTANT:
- The site may contain ADDITIONAL pages beyond the required ones.
- The router MUST work dynamically for ANY section with class="page".
- Do NOT hardcode page IDs inside the router.

==============================
ROUTING (SELF-MANAGED)
==============================

You MUST implement a dynamic hash router in JavaScript:

- On page load, detect ALL elements with class ".page".
- Show the section matching window.location.hash.
- If no hash exists, default to "#home".
- If the hash does not match any page, fallback to "#home".
- Listen for "hashchange" events.
- On hash change:
    • Remove .active from ALL ".page" sections
    • Add .active to the matching section (if exists)
    • Scroll to top

Navigation:
- Use <a href="#pageName"> for links
- MANDATORY ROUTER TEMPLATE (include this or similar logic):
    function showPage(id) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));
        const target = document.getElementById(id) || document.getElementById('home') || pages[0];
        if (target) target.classList.add('active');
        window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', () => showPage(location.hash.slice(1)));
    window.addEventListener('load', () => showPage(location.hash.slice(1) || 'home'));
    document.addEventListener('click', e => {
        const a = e.target.closest('a');
        if (a) {
            const href = a.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
                e.preventDefault();
                window.location.hash = href.startsWith('#') ? href : '#' + (href.split('/').pop().replace('.html', '') || 'home');
            }
        }
    });

==============================
REQUIRED PAGES
==============================

Always include:
- #home
- #about
- #services (or equivalent)
- #contact

The user may request additional pages (e.g., #pricing, #blog, #portfolio, etc.).
If so:
- Create them as <section class="page" id="requestedName">
- Include them in navigation
- Ensure the router automatically supports them

Each page must:
- Be min-height: 100vh
- Feel like a complete screen experience

==============================
NAVBAR
==============================

- Fixed
- backdrop-filter: blur(20px)
- Logo left, nav right
- Hamburger toggles .nav-open class only
- Router controls which page is active (not nav click handlers)

==============================
HOME PAGE
==============================

Must contain:
- Hero section (full viewport height)
- Strong headline
- Subtext
- CTA button
- 3 additional sections
- Footer inside #home

==============================
DESIGN
==============================

- Google Fonts via @import
- :root CSS variables for colors:
    --primary
    --accent
    --bg
    --surface
    --text
- CRITICAL: Ensure high contrast. If background is dark, text MUST be explicitly set to a light color like #fff.
- CRITICAL: Do NOT use 'opacity: 0' as a default state for animations. All text and elements MUST be 100% visible without JavaScript. If animating, animate from 1 to 1 or add a specific class via JS first.
- Smooth hover transitions
- Real copy (no lorem ipsum)
- Inline SVG icons only
- CSS keyframes for motion

==============================
OUTPUT FORMAT
==============================

===HTML===
(body content only)
===CSS===
(all styles)
===JS===
(all JavaScript including dynamic router - THIS BLOCK IS MANDATORY AND MUST BE NON-EMPTY)
===END===
`;

// ─── AI Providers ─────────────────────────────────────────────────────────────

async function callGemini(prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.9, maxOutputTokens: 8192, topP: 0.95 },
            }),
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(`Gemini ${res.status}: ${err?.error?.message || res.statusText}`);
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callGroq(prompt) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error('GROQ_API_KEY not configured');

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.9,
            max_tokens: 8192,
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(`Groq ${res.status}: ${err?.error?.message || res.statusText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
}

async function callOpenRouter(prompt) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured');

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': 'CreateGen',
        },
        body: JSON.stringify({
            model: process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat:free',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.9,
            max_tokens: 8192,
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(`OpenRouter ${res.status}: ${err?.error?.message || res.statusText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
}

// Auto-selects provider based on available env keys, with fallback chain
async function generateWithAI(prompt) {
    const providers = [
        { name: 'Gemini', fn: callGemini, key: 'GEMINI_API_KEY' },
        { name: 'Groq', fn: callGroq, key: 'GROQ_API_KEY' },
        { name: 'OpenRouter', fn: callOpenRouter, key: 'OPENROUTER_API_KEY' },
    ];

    const available = providers.filter(p => process.env[p.key]);

    if (available.length === 0) {
        throw new Error(
            'No AI API key found. Add GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY to your .env.local file.'
        );
    }

    let lastError;
    for (const provider of available) {
        try {
            console.log(`[CreateGen] Using provider: ${provider.name}`);
            const text = await provider.fn(prompt);
            if (text?.trim()) return text;
            throw new Error('Empty response from provider');
        } catch (err) {
            console.warn(`[CreateGen] ${provider.name} failed:`, err.message);
            lastError = err;
        }
    }

    throw lastError || new Error('All AI providers failed. Check your API keys.');
}

// ─── Parser ───────────────────────────────────────────────────────────────────
function parseCodeBlocks(text) {
    let html = '';
    let css = '';
    let js = '';

    // 1. Try to parse using markdown code blocks first (often used by models despite instructions)
    const htmlFenceMatch = text.match(/```(?:html|[^`]*body)[ \n]*([\s\S]*?)```/i);
    const cssFenceMatch = text.match(/```(?:css|style)[ \n]*([\s\S]*?)```/i);
    const jsFenceMatch = text.match(/```(?:javascript|js|script)[ \n]*([\s\S]*?)```/i);

    if (htmlFenceMatch) html = htmlFenceMatch[1].trim();
    if (cssFenceMatch) css = cssFenceMatch[1].trim();
    if (jsFenceMatch) js = jsFenceMatch[1].trim();

    // 2. If fences weren't found or were incomplete, try line-by-line marker parsing
    if (!html && !css && !js) {
        const lines = text.split('\n');
        let currentBlock = null;
        let inCodeBlock = false;

        for (const line of lines) {
            const trimmedLine = line.trim();
            const upperLine = trimmedLine.toUpperCase();

            // Check for markdown fence start/end
            if (trimmedLine.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                // If it's a fence with a language, try to set currentBlock
                const langMatch = trimmedLine.match(/```(html|css|js|javascript)/i);
                if (inCodeBlock && langMatch) {
                    currentBlock = langMatch[1].toLowerCase() === 'javascript' ? 'js' : langMatch[1].toLowerCase();
                } else if (!inCodeBlock) {
                    currentBlock = null; // End of a fenced block
                }
                continue; // Skip the fence line itself
            }

            if (inCodeBlock) {
                // If we are inside a fenced block, append to the currentBlock
                if (currentBlock === 'html') html += line + '\n';
                else if (currentBlock === 'css') css += line + '\n';
                else if (currentBlock === 'js') js += line + '\n';
                continue;
            }

            // Match section markers like ===HTML===, ### CSS ###, **JS**, HTML:, <!-- HTML -->
            if (/^(?:===|###|\*\*|<!--)?\s*(HTML|CSS|JS|JAVASCRIPT)(?:\s*CODE)?\s*(?:===|###|\*\*|:|-->)*$/.test(upperLine)) {
                const match = upperLine.match(/(HTML|CSS|JS|JAVASCRIPT)/);
                if (match) {
                    const section = match[1] === 'JAVASCRIPT' ? 'js' : match[1].toLowerCase();
                    currentBlock = section;
                }
            } else if (/^(?:===|###|\*\*|<!--)?\s*END\s*(?:===|###|\*\*|-->)*$/.test(upperLine)) {
                currentBlock = null;
            } else {
                if (currentBlock === 'html') html += line + '\n';
                else if (currentBlock === 'css') css += line + '\n';
                else if (currentBlock === 'js') js += line + '\n';
            }
        }
    }

    // 3. Clean up any remaining block wrappers if they got merged
    html = html.replace(/^```html\s*/i, '').replace(/```\s*$/i, '').trim();
    css = css.replace(/^```css\s*/i, '').replace(/```\s*$/i, '').trim();
    js = js.replace(/^```(?:javascript|js)\s*/i, '').replace(/```\s*$/i, '').trim();

    // 4. EXTRACTION FALLBACK: If AI returned a single monolithic HTML file despite instructions
    if (html && html.includes('<style')) {
        const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (styleMatch) {
            css = styleMatch[1].trim() + '\n' + css;
            html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/i, '');
        }
    }

    if (html && html.includes('<script')) {
        const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (scriptMatch) {
            js = scriptMatch[1].trim() + '\n' + js;
            html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/i, '');
        }
    }

    // Final Cleanup: remove head, body, html tags if present and clean up style/script tags inside css/js blocks
    html = html.replace(/<\/?(?:html|head|body)[^>]*>/gi, '').trim();
    css = css.replace(/<\/?style[^>]*>/gi, '').trim();
    js = js.replace(/<\/?script[^>]*>/gi, '').trim();

    console.log(`[CreateGen] Parse complete. HTML: ${html.length} chars, CSS: ${css.length} chars, JS: ${js.length} chars.`);

    // Total failure fallback
    if (!html && !css && !js && text.length > 50) {
        console.warn('[CreateGen] Total parse failure, extracting largest code blocks.');
        const monolithicCodeMatch = text.match(/```[a-z]*\n([\s\S]*?)```/i);
        if (monolithicCodeMatch) {
            html = monolithicCodeMatch[1].trim();
        } else {
            html = text.trim();
        }
    }

    if (!html) {
        throw new Error('AI did not return any code. Please try again.');
    }

    // Auto-repair missing .page classes
    if (!html.includes('class="page"') && !html.includes("class='page'")) {
        console.warn("[CreateGen] Missing .page classes, auto-repairing...");
        html = html.replace(/<section\b/gi, '<section class="page"');
    }

    // Auto-repair aggressive opacity: 0 bugs
    if (css.includes('opacity: 0') || css.includes('opacity:0')) {
        css += `\n/* FAILSAFE: Ensure content is visible if JS animations fail */\nbody * { opacity: 1 !important; visibility: visible !important; }`;
    }

    // FALLBACK: If AI forgot or failed to provide working custom JS, inject a default router
    if (!js || js.length < 50) {
        console.warn("[CreateGen] JS block was empty or too short. Injecting default router.");
        js = `
(function() {
    function showPage(id) {
        const pages = document.querySelectorAll('.page');
        if (pages.length === 0) return;

        pages.forEach(p => p.classList.remove('active'));
        const target = document.getElementById(id) || document.getElementById('home') || pages[0];
        if (target) {
            target.classList.add('active');
        }
        window.scrollTo(0, 0);
    }

    // Intercept clicks to prevent default navigation and enforce hash routing
    document.addEventListener('click', (e) => {
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
                    showPage(targetPage.slice(1));
                }, 10);
            }
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'visible', 'animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    function init() {
        showPage(location.hash.slice(1) || 'home');
        document.querySelectorAll('section, h1, h2, h3, .card, .feature-item, img').forEach(el => {
            observer.observe(el);
        });
    }

    window.addEventListener('hashchange', () => showPage(location.hash.slice(1)));
    window.addEventListener('load', () => setTimeout(init, 100));
})();`;
    }

    return { html, css, js };
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(request) {
    try {
        const body = await request.json();
        const {
            category = 'Portfolio',
            prompt: userPrompt = '',
            mode = 'initial',
            currentCode = null,
            refinementInput = '',
            contentPrompt = '',
            colorPrompt = '',
            functionalityPrompt = '',
        } = body;

        // Combine dashboard-specific fields if primary prompt is empty
        let processedPrompt = userPrompt;
        if (!processedPrompt && (contentPrompt || colorPrompt || functionalityPrompt)) {
            processedPrompt = `Content: ${contentPrompt}\nStyle: ${colorPrompt}\nFunctionality: ${functionalityPrompt}`;
        }

        // ── Credits ──────────────────────────────────────────────────────────
        const cookieStore = await cookies();
        const creditsStr = cookieStore.get('user-credits')?.value;
        let credits = creditsStr !== undefined ? parseInt(creditsStr, 10) : 100;
        if (isNaN(credits) || credits < 5) credits = 100; // auto-refill for dev

        const cost = CREDIT_COSTS[mode] ?? 0;
        if (credits < cost) {
            return NextResponse.json({ error: 'Insufficient credits.' }, { status: 403 });
        }

        // ── Build Final Prompt ────────────────────────────────────────────────
        const dna = CATEGORY_DNA[category] || CATEGORY_DNA['Portfolio'];
        let finalPrompt;

        if (mode === 'initial') {
            if (!processedPrompt.trim()) {
                return NextResponse.json({ error: 'Please enter a prompt.' }, { status: 400 });
            }

            finalPrompt = `${SYSTEM_PROMPT}

---
WEBSITE CATEGORY: ${category}
DESIGN DNA:
  - Color palette: ${dna.palette}
  - Typography: ${dna.fonts}
  - Mood & tone: ${dna.mood}
  - Must-have elements: ${dna.mustHave}

USER VISION: "${processedPrompt}"
---

Build this website now. Be bold, creative, and highly detailed. Use real copy — no placeholder text.
Return ONLY the three delimited code blocks. No explanation, no markdown outside the blocks.`;

        } else if (mode === 'refinement') {
            if (!refinementInput.trim()) {
                return NextResponse.json({ error: 'Please describe the changes you want.' }, { status: 400 });
            }

            finalPrompt = `${SYSTEM_PROMPT}

---
TASK: Apply these specific modifications to the existing website:
"${refinementInput}"

EXISTING CODEBASE:
===HTML===
${currentCode?.html || ''}
===CSS===
${currentCode?.css || ''}
===JS===
${currentCode?.js || ''}
===END===
---

Return the COMPLETE updated files — all three blocks fully rewritten with changes applied.
Do NOT omit or truncate any unchanged sections. Return every line.
No explanation, no markdown outside the blocks.`;

        } else {
            return NextResponse.json({ error: 'Invalid mode.' }, { status: 400 });
        }

        // ── Generate ──────────────────────────────────────────────────────────
        const rawText = await generateWithAI(finalPrompt);
        const result = parseCodeBlocks(rawText);

        // ── Deduct Credits ────────────────────────────────────────────────────
        credits -= cost;
        cookieStore.set('user-credits', String(credits), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: false,
            sameSite: 'lax',
        });

        return NextResponse.json({
            ...result,
            creditsRemaining: credits,
            mode,
        });

    } catch (error) {
        console.error('[CreateGen API Error]', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}