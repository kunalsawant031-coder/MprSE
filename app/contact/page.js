export default function Contact() {
    return (
        <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 bg-zinc-900/50 p-10 rounded-2xl border border-zinc-800 backdrop-blur-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Get in touch
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-zinc-700 placeholder-gray-500 text-white bg-zinc-900 rounded-t-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-colors" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea id="message" name="message" rows="4" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-zinc-700 placeholder-gray-500 text-white bg-zinc-900 rounded-b-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-colors" placeholder="How can we help?"></textarea>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg shadow-purple-500/20">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
