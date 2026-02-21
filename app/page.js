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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">

      <section className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
            Build Stunning Websites
          </span>
          <br />
          <span className="text-white">With AI Precision</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 leading-relaxed">
          Unlock your creativity with Criar. Generate production-ready HTML, CSS, and JS code instantly using our advanced AI models. No coding required.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/dashboard" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-white/10">
            Start Creating Free
          </Link>
          <Link href="/about" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
            Learn More
          </Link>
        </div>
      </section>


      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
            Experience the Future
          </span>
        </h2>

        <div className="space-y-24">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 md:p-12 bg-zinc-900 ring-1 ring-white/10 rounded-xl leading-none flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <div className="inline-block p-3 bg-purple-500/20 rounded-lg">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white">AI-Native Development</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Transform abstract ideas into production-ready applications instantly. Our Gemini-powered engine understands context, design systems, and functionality requirements—writing code so you don't have to.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Context-aware generation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Modern, semantic HTML5 & CSS3
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-black rounded-lg border border-white/10 p-4 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="text-6xl mb-2">✨</div>
                    <div className="font-mono text-sm text-purple-400">Generative Engine Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 md:p-12 bg-zinc-900 ring-1 ring-white/10 rounded-xl leading-none flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="flex-1 space-y-8">
                <div className="inline-block p-3 bg-blue-500/20 rounded-lg">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white">Integrated Codespace</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Experience a seamless developer environment. Your personal codespace allows you to edit code in real-time with a live preview side-by-side. It's a powerful workspace designed for creators who need instant feedback.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    Real-time Live Preview
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    Split-pane Editor
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-video bg-[#0d1117] rounded-lg border border-white/10 p-4 font-mono text-xs text-gray-400 overflow-hidden relative">
                  <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-white/5 border-l border-white/10 flex items-center justify-center">
                    <span className="text-white font-bold">Preview</span>
                  </div>
                  <div className="p-2">
                    <span className="text-pink-400">function</span> <span className="text-blue-400">App</span>() {'{'}
                    <br />&nbsp;&nbsp;<span className="text-purple-400">return</span> (
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">div</span>&gt;Hello World&lt;/<span className="text-green-400">div</span>&gt;
                    <br />&nbsp;&nbsp;);
                    <br />{'}'}
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 md:p-12 bg-zinc-900 ring-1 ring-white/10 rounded-xl leading-none flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <div className="inline-block p-3 bg-orange-500/20 rounded-lg">
                  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white">Modern Tech Ecosystem</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Built for the future. Scale your projects with our upcoming integrations. From secure authentication to database management, we're building the infrastructure so you can focus on the product.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <span className="block text-sm text-gray-400 mb-1">Authentication</span>
                    <span className="font-bold text-white">Clerk</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <span className="block text-sm text-gray-400 mb-1">Database</span>
                    <span className="font-bold text-white">Supabase + Prisma</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-video bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-lg border border-white/10 p-4 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-8 text-center opacity-80">
                    <div className="p-4 bg-black/40 rounded-lg">
                      <div className="h-2 w-12 bg-gray-600 rounded mb-2 mx-auto"></div>
                      <div className="h-2 w-8 bg-gray-700 rounded mx-auto"></div>
                    </div>
                    <div className="p-4 bg-black/40 rounded-lg">
                      <div className="h-2 w-12 bg-gray-600 rounded mb-2 mx-auto"></div>
                      <div className="h-2 w-8 bg-gray-700 rounded mx-auto"></div>
                    </div>
                    <div className="col-span-2 p-2 bg-green-500/20 text-green-400 rounded text-xs">
                      System Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
