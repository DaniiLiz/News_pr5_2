import { Providers } from './providers'
import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'NEON_NEWS | Главная',
    description: 'Киберпанк новостной агрегатор',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru" className="bg-gray-900">
        <body className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        <header className="bg-gray-900 border-b border-purple-500 shadow-lg shadow-purple-500/10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-bold hover:scale-105 transition-transform font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
                >
                    NEON_<span className="text-pink-400">NEWS</span>
                </Link>
                <nav className="flex gap-6 items-center">
                    <Link
                        href="/"
                        className="hover:text-cyan-300 transition-colors font-mono border-b border-transparent hover:border-cyan-300"
                    >
                        /Главная
                    </Link>
                    <Link
                        href="/account"
                        className="hover:text-cyan-300 transition-colors font-mono border-b border-transparent hover:border-cyan-300"
                    >
                        /Профиль
                    </Link>
                </nav>
            </div>
        </header>

        <main className="flex-grow">
            <Providers>{children}</Providers>
        </main>

        <footer className="bg-gray-900 border-t border-purple-500 py-6 text-center font-mono text-sm text-gray-400">
            <div className="container mx-auto px-4">
                <p>© 2077 NEON_NEWS Corporation. All rights reserved.</p>
                <p className="mt-1">[ SYSTEM STATUS: ONLINE ]</p>
            </div>
        </footer>
        </body>
        </html>
    )
}