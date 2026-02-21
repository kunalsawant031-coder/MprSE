'use client';

import { useState } from 'react';

const CATEGORIES = [
    { id: 'landing', name: 'Landing Page' },
    { id: 'portfolio', name: 'Portfolio Simple' },
    { id: 'ecommerce', name: 'E-commerce Product Page' },
    { id: 'blog', name: 'Blog Homepage' },
    { id: 'contact', name: 'Contact Form Page' },
    { id: 'dashboard', name: 'Dashboard Overview' },
    { id: 'auth', name: 'Login/Signup Flow' },
    { id: 'event', name: 'Event Registration' },
    { id: 'consulting', name: 'Consulting Services' },
    { id: 'docs', name: 'Documentation Page' },
];

export default function NewProject() {
    const [category, setCategory] = useState(CATEGORIES[0].id);
    const [contentPrompt, setContentPrompt] = useState('');
    const [colorPrompt, setColorPrompt] = useState('');
    const [functionalityPrompt, setFunctionalityPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState(null);
    const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code'
    const [activeTab, setActiveTab] = useState('html');
    const [responsiveMode, setResponsiveMode] = useState('desktop');

    const handleGenerate = async () => {
        setIsGenerating(true);

        try {
            const combinedPrompt = `Structure: ${category}\nContent: ${contentPrompt}\nStyle: ${colorPrompt}\nLogic: ${functionalityPrompt}`;

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category,
                    prompt: combinedPrompt,
                    // Keep original fields for backward compatibility if needed
                    contentPrompt,
                    colorPrompt,
                    functionalityPrompt
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || errorData.error || 'Generation failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const buildSrcDoc = () => {
        if (!result) return '';
        const { html, css, js } = result;
        // Escape </script> to prevent breaking the iframe structure
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

    return (
        <div className="min-h-screen bg-black text-white px-4 py-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Create New Site</h1>
                        <p className="text-gray-400">Describe your vision, and we'll build the code.</p>
                    </div>

                    <div className="space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm">

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Website Structure</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Content Strategy</label>
                            <textarea
                                value={contentPrompt}
                                onChange={(e) => setContentPrompt(e.target.value)}
                                rows={3}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-600"
                                placeholder="e.g. 'Hero with bold headline, 3 feature cards, testimonials section...'"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Color & Style</label>
                            <textarea
                                value={colorPrompt}
                                onChange={(e) => setColorPrompt(e.target.value)}
                                rows={2}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-zinc-600"
                                placeholder="e.g. 'Dark mode, neon purple accents, glassmorphism cards...'"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Functionality & Logic</label>
                            <textarea
                                value={functionalityPrompt}
                                onChange={(e) => setFunctionalityPrompt(e.target.value)}
                                rows={2}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-600"
                                placeholder="e.g. 'Smooth scroll nav, modal on click, form validation...'"
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${isGenerating
                                ? 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30'
                                }`}
                        >
                            {isGenerating ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Forging Code...
                                </span>
                            ) : (
                                'Generate Website'
                            )}
                        </button>
                    </div>
                </div>


                <div className="bg-zinc-900/80 rounded-xl border border-zinc-800 flex flex-col h-full min-h-[600px] overflow-hidden backdrop-blur-sm">
                    {!result ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8 text-center">
                            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            <p className="text-lg font-medium">Ready to build.</p>
                            <p className="text-sm">Configure your requirements and click Generate.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex border-b border-zinc-700 bg-zinc-950 items-center px-2">
                                <div className="flex bg-zinc-900 rounded-lg p-1 my-2 mr-4">
                                    <button
                                        onClick={() => setViewMode('preview')}
                                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'preview' ? 'bg-zinc-800 text-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        Preview
                                    </button>
                                    <button
                                        onClick={() => setViewMode('code')}
                                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'code' ? 'bg-zinc-800 text-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        Code
                                    </button>
                                </div>

                                {viewMode === 'code' && (
                                    <div className="flex flex-1">
                                        {['html', 'css', 'js'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setActiveTab(type)}
                                                className={`flex-1 py-3 text-xs font-medium transition-colors ${activeTab === type
                                                    ? 'text-purple-400 border-b-2 border-purple-500'
                                                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                                                    }`}
                                            >
                                                {type.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {viewMode === 'preview' && (
                                    <div className="flex gap-1 ml-auto">
                                        {[
                                            { id: 'mobile', icon: '📱' },
                                            { id: 'tablet', icon: '⬛' },
                                            { id: 'desktop', icon: '🖥' }
                                        ].map(({ id, icon }) => (
                                            <button
                                                key={id}
                                                onClick={() => setResponsiveMode(id)}
                                                className={`p-2 rounded-lg text-xs transition-all ${responsiveMode === id ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                                                title={id.charAt(0).toUpperCase() + id.slice(1)}
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 relative bg-[#010409] overflow-hidden">
                                {viewMode === 'code' ? (
                                    <div className="h-full p-4 font-mono text-sm overflow-auto">
                                        <pre className="text-gray-300">
                                            <code>{result[activeTab]}</code>
                                        </pre>

                                        <button
                                            onClick={() => copyToClipboard(result[activeTab])}
                                            className="absolute top-4 right-4 p-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
                                            title="Copy to clipboard"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center p-4 bg-zinc-950">
                                        <div
                                            className="bg-white transition-all duration-300 overflow-hidden shadow-2xl shadow-black"
                                            style={{
                                                width: responsiveMode === 'mobile' ? '390px' : responsiveMode === 'tablet' ? '768px' : '100%',
                                                height: responsiveMode === 'mobile' ? '667px' : '100%',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                borderRadius: responsiveMode === 'desktop' ? '0' : '20px'
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
                                )}
                            </div>

                            <div className="p-4 border-t border-zinc-700 bg-zinc-900 flex justify-end space-x-4">
                                <button
                                    onClick={() => {
                                        const { html, css, js } = result;

                                        const downloadFile = (content, filename, type = 'text/plain') => {
                                            const element = document.createElement("a");
                                            const file = new Blob([content], { type });
                                            element.href = URL.createObjectURL(file);
                                            element.download = filename;
                                            document.body.appendChild(element);
                                            element.click();
                                            document.body.removeChild(element);
                                        };

                                        // Full HTML wrap for index.html
                                        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Generated Site</title>
    <style>
        /* Base styles to ensure multi-page routing works */
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
                                    }}
                                    className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    Download All Files
                                </button>
                                <button
                                    onClick={() => setViewMode('preview')}
                                    className="px-4 py-2 bg-purple-600 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
                                >
                                    Live Preview
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
