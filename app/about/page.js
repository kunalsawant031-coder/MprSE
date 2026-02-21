export default function About() {
    return (
        <div className="min-h-screen bg-black text-white px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    About Criar
                </h1>
                <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
                    We are on a mission to democratize web development.
                </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2 max-w-5xl mx-auto items-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-gray-400 leading-relaxed">
                            To provide everyone, regardless of technical skill, the ability to create beautiful, functional websites in minutes.
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">The Technology</h3>
                    <p className="text-gray-400 mb-6">
                        Criar leverages state-of-the-art Large Language Models fine-tuned on thousands of high-quality web templates. Our engine understands design nuances and functional requirements to deliver code that just works.
                    </p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center">
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
                            Optimized for clean, semantic HTML5
                        </li>
                        <li className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Modern, responsive CSS generation
                        </li>
                        <li className="flex items-center">
                            <span className="h-2 w-2 bg-pink-500 rounded-full mr-3"></span>
                            Interactive JavaScript functionality
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
