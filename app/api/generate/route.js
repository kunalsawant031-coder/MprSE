import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CREDIT_COSTS = { initial: 0, refinement: 0 };

const CATEGORY_DNA = {
    Portfolio: {
        palette: 'deep navy background + electric cyan accent, layered dark mode UI with subtle radial glows',
        fonts: 'Syne (headings 700-800) + DM Sans (body 400-500)',
        mood: 'Elite creative developer — sharp, futuristic, high-skill presence',
        layoutDNA: 'bento grid hero or split hero layout, asymmetrical sections, max-width 1200px centered container',
        motionDNA: 'animated skill bars on scroll, hover-lift project cards, subtle glow pulse on CTA',
        mustHave: 'bento grid or animated skills section, project showcase grid with hover tilt, GitHub + LinkedIn icons, tech stack section',
        avoid: 'basic vertical stack layouts, generic centered hero with single button',
    },
    Restaurant: {
        palette: 'warm cream + deep terracotta OR midnight black with soft gold accents',
        fonts: 'Playfair Display (headings 600-700) + Lato (body 400)',
        mood: 'Cinematic, luxurious, appetite-whetting',
        layoutDNA: 'full-bleed hero with overlay gradient, alternating image-text split sections',
        motionDNA: 'slow parallax background, fade-in food cards, subtle gold shimmer on CTA',
        mustHave: 'full-screen hero with rich imagery, categorized menu grid, reservation CTA button, chef/ambience section',
        avoid: 'flat white backgrounds with no imagery',
    },
    "E-commerce": {
        palette: 'clean white + one bold accent (no multiple accents), strong product contrast',
        fonts: 'Cabinet Grotesk (headings 600-700) + Inter (body 400-500)',
        mood: 'Premium lifestyle brand, clean, conversion-focused',
        layoutDNA: 'featured product hero + structured 3-4 column product grid',
        motionDNA: 'hover zoom on product images, smooth add-to-cart feedback animation',
        mustHave: 'cart icon in navbar, featured collection hero, product grid with pricing + CTA, trust badges section',
        avoid: 'cluttered grids or too many accent colors',
    },
    Blog: {
        palette: 'off-white background + charcoal/slate text, strong typographic contrast',
        fonts: 'DM Serif Display (headings) + Source Serif 4 (body)',
        mood: 'Editorial, thoughtful, typography-driven',
        layoutDNA: 'featured hero article + masonry or 3-column article grid',
        motionDNA: 'subtle underline animation on hover, soft fade-in cards',
        mustHave: 'featured article hero, article card grid, category tags, newsletter signup block',
        avoid: 'overuse of color blocks — typography must lead design',
    },
    Event: {
        palette: 'deep black + neon pink or electric purple gradients',
        fonts: 'Bebas Neue (headings uppercase) + Outfit (body)',
        mood: 'High-energy, electric, FOMO-inducing',
        layoutDNA: 'centered dramatic hero with huge typography + countdown section',
        motionDNA: 'live countdown timer (JS), glowing animated gradient backgrounds',
        mustHave: 'countdown timer, lineup/speakers grid, ticket CTA, date + location in hero',
        avoid: 'muted colors or minimal typography',
    },
    Gym: {
        palette: 'pure black + white + one aggressive accent (yellow/red/orange)',
        fonts: 'Barlow Condensed (headings 700-800 uppercase) + Barlow (body)',
        mood: 'Raw power, intense, motivational',
        layoutDNA: 'bold split hero with large text overlaying imagery',
        motionDNA: 'hover punch animation on buttons, subtle shake on CTA',
        mustHave: 'membership pricing cards, transformation section, class schedule grid',
        avoid: 'soft pastel colors or thin typography',
    },
    Travel: {
        palette: 'sky blue gradient + sand tones OR deep ocean navy',
        fonts: 'Fraunces (headings) + Nunito (body)',
        mood: 'Dreamy, wanderlust, inviting',
        layoutDNA: 'image-forward hero with overlay text + destination card grid',
        motionDNA: 'slow float animation on cards, subtle gradient sky animation',
        mustHave: 'search/filter bar in hero, destination grid with overlay titles, featured trip section',
        avoid: 'text-heavy layouts without imagery',
    },
    Startup: {
        palette: 'dark slate + cyan or emerald gradient accents',
        fonts: 'Space Grotesk (headings 600-700) + Inter (body)',
        mood: 'Modern SaaS, clean, scalable, trustworthy',
        layoutDNA: 'split hero (text + mock UI panel), structured feature grid, centered pricing table',
        motionDNA: 'icon float animations, gradient button shimmer, smooth card elevation',
        mustHave: 'feature grid with icons, 3-tier pricing table, social proof logos, waitlist CTA',
        avoid: 'overcomplicated layouts or too many gradients',
    },
    Education: {
        palette: 'warm amber + deep brown, parchment-inspired tones',
        fonts: 'Merriweather (headings) + Open Sans (body)',
        mood: 'Trustworthy, warm, knowledge-focused',
        layoutDNA: 'structured course grid + instructor spotlight section',
        motionDNA: 'soft fade-up animations, highlight glow on enrollment CTA',
        mustHave: 'course cards grid, instructor profiles, student testimonials, enrollment CTA',
        avoid: 'overly modern neon colors',
    },
    Photography: {
        palette: 'near-black + sage green accent, muted and cinematic',
        fonts: 'Cormorant Garamond (headings) + Karla (body)',
        mood: 'Artistic, confident, gallery-quality',
        layoutDNA: 'masonry grid layout + full-screen lightbox hover',
        motionDNA: 'slow fade transitions between images, subtle film grain overlay',
        mustHave: 'masonry photo grid, service packages, fullscreen hover preview, contact form',
        avoid: 'boxed layouts with heavy borders',
    },
};

const SYSTEM_PROMPT = `You are Aetheris — an elite UI/UX web architect. You produce COMPLETE, FULLY-WRITTEN websites.

CRITICAL COMPLETION RULE:
- You MUST complete ALL code. Never truncate, never summarize with "// continues...", never use "..." 
- If you run out of space, SIMPLIFY the design but ALWAYS finish every block completely
- The ===END=== marker MUST appear after fully complete JS

================================================
STRICT OUTPUT FORMAT (NON-NEGOTIABLE)
================================================

Return EXACTLY this structure:

===HTML===
[complete body HTML here]
===CSS===
[complete CSS here]
===JS===
[complete JavaScript here]
===END===

NO text before ===HTML===
NO text after ===END===
NO markdown fences
NO explanations

================================================
ARCHITECTURE
================================================

Hash-based SPA. Every page uses:
  <section class="page" id="pageName">

Required pages: #home, #about, #services, #contact

Router (copy exactly):
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const t = document.getElementById(id) || document.getElementById('home');
    if (t) { t.classList.add('active'); window.scrollTo(0,0); }
}
window.addEventListener('hashchange', () => showPage(location.hash.slice(1)));
window.addEventListener('load', () => showPage(location.hash.slice(1) || 'home'));
document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (a) {
        const h = a.getAttribute('href');
        if (h && !h.startsWith('http') && !h.startsWith('mailto')) {
            e.preventDefault();
            window.location.hash = h.startsWith('#') ? h : '#' + (h.split('/').pop().replace('.html','') || 'home');
        }
    }
});

================================================
NAVBAR (MANDATORY)
================================================

:root { --nav-height: 72px; }
body { padding-top: var(--nav-height); }
.navbar { position:fixed; top:0; left:0; right:0; height:var(--nav-height); backdrop-filter:blur(20px); z-index:1000; }

================================================
COLOR SYSTEM
================================================

Must define:
:root {
  --primary: ;
  --accent: ;
  --bg: ;
  --surface: ;
  --text: ;
  --muted: ;
  --border: ;
}

================================================
HOME PAGE — ALL 6 SECTIONS REQUIRED
================================================

1. Split Hero: big headline, subtext, 2 CTAs, radial glow decoration
2. Feature Grid: 3-6 cards with inline SVG icons, real copy
3. Showcase / Product section with image
4. Social proof: testimonials OR animated stats counters  
5. Final CTA banner
6. Footer: 3-col grid, brand description, nav links, social SVG icons, copyright

================================================
IMAGES
================================================

IMAGE RULES (MANDATORY):

- ONLY use images from:
  1) https://images.unsplash.com/photo-REAL_ID?auto=format&fit=crop&w=1200&q=80
  2) https://picsum.photos/1200/800

- DO NOT use:
  - random Unsplash links
  - source.unsplash.com
  - placeholder.com
  - any other domain
  - local images
  - relative paths
  - base64 images

- For Unsplash:
  - You MUST use a REAL existing photo ID.
  - Format MUST be:
    https://images.unsplash.com/photo-<REAL_ID>?auto=format&fit=crop&w=1200&q=80

- If a valid Unsplash ID is unknown, use:
  https://picsum.photos/1200/800

- Never invent fake IDs like:
  photo-REAL_KNOWN_ID

- Every image must be HTTPS.

This rule is strict and must never be broken.


Use object-fit: cover. Always define container height.

================================================
QUALITY RULES
================================================

- Real copy (no "Lorem ipsum")
- No placeholder text anywhere
- All interactive buttons actually work (JS state changes)
- No broken references
- Cards, grids, sections fully populated with content
- Complete CSS (no missing closing braces)
- Complete JS (router + at least one interactive system)
`;



async function callGeminiModel(model, prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not set in .env.local');

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 65536,
                    topP: 0.9,
                },
            }),
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.error?.message || res.statusText;
        const status = res.status;

        // Surface quota errors clearly
        if (status === 429) throw new Error(`QUOTA_EXCEEDED:${model}`);
        if (status === 400) throw new Error(`BAD_REQUEST:${model}: ${msg}`);
        throw new Error(`Gemini ${status} (${model}): ${msg}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) throw new Error(`Empty response from ${model}`);
    return text;
}


const GEMINI_MODELS = [
    'gemini-2.5-flash',       // Current best free-tier balance
    'gemini-2.0-flash-001',   // Stable fallback
    'gemini-3-flash-preview', // Frontier speed (if in preview)
    'gemini-2.5-flash-lite'   // Smallest / high-throughput
];
async function generateWithAI(prompt) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY not found. Add it to your .env.local file.');
    }

    let lastError;
    for (const model of GEMINI_MODELS) {
        try {
            console.log(`[CreateGen] Trying ${model}...`);
            const text = await callGeminiModel(model, prompt);
            if (text.length > 500) {
                console.log(`[CreateGen] ✓ ${model} succeeded — ${text.length} chars`);
                return text;
            }
            throw new Error('Response too short');
        } catch (err) {
            console.warn(`[CreateGen] ✗ ${model} failed: ${err.message}`);
            lastError = err;
            // Only continue to next model on quota/rate errors
            if (!err.message.startsWith('QUOTA_EXCEEDED') && !err.message.includes('429')) {
                break;
            }
        }
    }

    throw new Error(
        lastError?.message?.includes('QUOTA_EXCEEDED')
            ? 'All Gemini models are rate-limited. Wait a minute and try again, or check your quota at aistudio.google.com.'
            : lastError?.message || 'Gemini request failed. Check your API key.'
    );
}



function parseCodeBlocks(text) {
    let html = '', css = '', js = '';

    const htmlMatch = text.match(/===HTML===([\s\S]*?)(?====CSS===|===END===|$)/i);
    const cssMatch = text.match(/===CSS===([\s\S]*?)(?====JS===|===END===|$)/i);
    const jsMatch = text.match(/===JS===([\s\S]*?)(?====END===|$)/i);

    if (htmlMatch) html = htmlMatch[1].trim();
    if (cssMatch) css = cssMatch[1].trim();
    if (jsMatch) js = jsMatch[1].trim();

   
    if (!html && !css && !js) {
        const htmlFence = text.match(/```(?:html)[^\n]*\n([\s\S]*?)```/i);
        const cssFence = text.match(/```(?:css)[^\n]*\n([\s\S]*?)```/i);
        const jsFence = text.match(/```(?:javascript|js)[^\n]*\n([\s\S]*?)```/i);
        if (htmlFence) html = htmlFence[1].trim();
        if (cssFence) css = cssFence[1].trim();
        if (jsFence) js = jsFence[1].trim();
    }

    if (!html && !css && !js) {
        const lines = text.split('\n');
        let current = null;
        const blocks = { html: [], css: [], js: [] };
        for (const line of lines) {
            const u = line.trim().toUpperCase().replace(/[^A-Z]/g, '');
            if (u === 'HTML') { current = 'html'; continue; }
            if (u === 'CSS') { current = 'css'; continue; }
            if (u === 'JS' || u === 'JAVASCRIPT') { current = 'js'; continue; }
            if (u === 'END') { current = null; continue; }
            if (current) blocks[current].push(line);
        }
        html = blocks.html.join('\n').trim();
        css = blocks.css.join('\n').trim();
        js = blocks.js.join('\n').trim();
    }

  
    html = html.replace(/^```[\w]*\n?/i, '').replace(/\n?```$/i, '').trim();
    css = css.replace(/^```[\w]*\n?/i, '').replace(/\n?```$/i, '').trim();
    js = js.replace(/^```[\w]*\n?/i, '').replace(/\n?```$/i, '').trim();

   
    if (html.includes('<style')) {
        const m = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (m) { css = m[1].trim() + '\n' + css; html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ''); }
    }
    if (html.includes('<script')) {
        const m = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (m) { js = m[1].trim() + '\n' + js; html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ''); }
    }


    html = html.replace(/<\/?(?:html|head|body)[^>]*>/gi, '').trim();
    css = css.replace(/<\/?style[^>]*>/gi, '').trim();
    js = js.replace(/<\/?script[^>]*>/gi, '').trim();

    console.log(`[CreateGen] Parse: HTML=${html.length}ch, CSS=${css.length}ch, JS=${js.length}ch`);

    // Validate: if CSS seems truncated (missing last }), close it
    const openBraces = (css.match(/{/g) || []).length;
    const closeBraces = (css.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
        css += '\n' + '}'.repeat(openBraces - closeBraces);
        console.warn(`[CreateGen] CSS auto-closed ${openBraces - closeBraces} brace(s)`);
    }

    // Inject default router if JS is empty/tiny
    if (!js || js.length < 100) {
        console.warn('[CreateGen] Injecting fallback router JS');
        js = `(function(){
function showPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    var t=document.getElementById(id)||document.getElementById('home')||document.querySelector('.page');
    if(t){t.classList.add('active');window.scrollTo(0,0);}
}
window.addEventListener('hashchange',function(){showPage(location.hash.slice(1));});
window.addEventListener('load',function(){showPage(location.hash.slice(1)||'home');});
document.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(a){var h=a.getAttribute('href');
    if(h&&!h.startsWith('http')&&!h.startsWith('mailto')){
        e.preventDefault();
        window.location.hash=h.startsWith('#')?h:'#'+(h.split('/').pop().replace('.html','')||'home');
    }}
});
})();`;
    }

    // Ensure .page visibility works
    if (!css.includes('.page.active') && !css.includes('.page {')) {
        css = `.page{display:none}.page.active{display:block}\n` + css;
    }

    if (!html) throw new Error('AI did not return valid HTML. Please try again.');
    return { html, css, js };
}


export async function POST(request) {
    try {
        const body = await request.json();
        const {
            category = 'Portfolio',
            prompt: userPrompt = '',
            mode = 'initial',
            currentCode = null,
            refinementInput = '',
        } = body;

        const cookieStore = await cookies();
        const creditsStr = cookieStore.get('user-credits')?.value;
        let credits = creditsStr !== undefined ? parseInt(creditsStr, 10) : 100;
        if (isNaN(credits) || credits < 0) credits = 100;

        const cost = CREDIT_COSTS[mode] ?? 0;
        if (credits < cost) {
            return NextResponse.json({ error: 'Insufficient credits.' }, { status: 403 });
        }

        const dna = CATEGORY_DNA[category] || CATEGORY_DNA['Portfolio'];
        let finalPrompt;

        if (mode === 'initial') {
            if (!userPrompt.trim()) {
                return NextResponse.json({ error: 'Please enter a prompt.' }, { status: 400 });
            }

            finalPrompt = `WEBSITE CATEGORY: ${category}

DESIGN DNA:
- Color palette: ${dna.palette}
- Typography: ${dna.fonts}
- Mood: ${dna.mood}
- Layout: ${dna.layoutDNA}
- Motion: ${dna.motionDNA}
- Must include: ${dna.mustHave}
- Avoid: ${dna.avoid}

USER VISION: "${userPrompt}"

Build this complete website. Use REAL copy — brand name, realistic text, real content. No placeholders.
Output ONLY the three code blocks in the exact format:
===HTML===
[body HTML]
===CSS===
[all styles]
===JS===
[all JavaScript]
===END===`;

        } else if (mode === 'refinement') {
            if (!refinementInput.trim()) {
                return NextResponse.json({ error: 'Please describe the changes you want.' }, { status: 400 });
            }

            finalPrompt = `Apply these modifications to the existing website: "${refinementInput}"

EXISTING CODE:
===HTML===
${currentCode?.html || ''}
===CSS===
${currentCode?.css || ''}
===JS===
${currentCode?.js || ''}
===END===

Return the COMPLETE updated code for all three blocks — do not omit or truncate anything.
Use the same output format:
===HTML===
[complete HTML]
===CSS===
[complete CSS]
===JS===
[complete JS]
===END===`;

        } else {
            return NextResponse.json({ error: 'Invalid mode.' }, { status: 400 });
        }

        const rawText = await generateWithAI(finalPrompt);
        const result = parseCodeBlocks(rawText);

        credits -= cost;
        cookieStore.set('user-credits', String(credits), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: false,
            sameSite: 'lax',
        });

        return NextResponse.json({ ...result, creditsRemaining: credits, mode });

    } catch (error) {
        console.error('[CreateGen API Error]', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}