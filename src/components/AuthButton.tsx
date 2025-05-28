'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
    const { data: session } = useSession()

    return (
        <button
            onClick={() => (session ? signOut() : signIn())}
            className={`px-4 py-2 rounded-lg font-mono transition-all duration-300 ${
                session
                    ? 'bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-gray-900'
                    : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90'
            }`}
        >
            {session ? (
                <>
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    ВЫХОД
                </>
            ) : (
                'ВХОД'
            )}
        </button>
    )
}