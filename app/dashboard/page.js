import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function Dashboard() {
    const cookieStore = await cookies();
    const credits = cookieStore.get('user-credits')?.value || 10;

    return (
        <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Dashboard</h1>
                        <p className="text-gray-400 mt-2">Welcome back, Creator.</p>
                    </div>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        <div className="bg-zinc-900 rounded-lg px-4 py-2 border border-zinc-800 flex items-center">
                            <span className="text-sm text-gray-400 mr-2">Credits:</span>
                            <span className="text-xl font-bold text-green-400">{credits}</span>
                        </div>
                        <Link href="/x" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                            + New Project
                        </Link>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <Link href="/x" className="border border-dashed border-zinc-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-purple-500 hover:bg-purple-500/5 transition-all cursor-pointer group h-64">
                        <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                            <svg className="w-6 h-6 text-gray-500 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-300 group-hover:text-white">Create New Project</h3>
                        <p className="text-sm text-gray-500 mt-2">Start a new website generation</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
