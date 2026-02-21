export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Criar</h3>
                        <p className="text-sm">Empowering creators to build stunning websites with AI assistance.</p>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">Github</a>
                            <a href="#" className="hover:text-white transition-colors">Discord</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Criar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
