'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { getPosts, addPost, deletePost } from '@/lib/posts'
import type { Post } from '@/lib/posts'
import AuthButton from '@/components/AuthButton'

export default function HomePage() {
    const { data: session } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [isCreating, setIsCreating] = useState(false)
    const [newPost, setNewPost] = useState({
        title: '',
        content: ''
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const loadedPosts = await getPosts()
                setPosts(loadedPosts)
            } catch (error) {
                console.error('Ошибка при загрузке новостей:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadPosts()
    }, [])

    const handleAddPost = async () => {
        if (!session?.user?.name) return

        const createdPost: Post = {
            id: Date.now().toString(),
            title: newPost.title || 'Без названия',
            content: newPost.content || 'Нет содержимого',
            author: session.user.name
        }

        try {
            setPosts([createdPost, ...posts])
            setNewPost({ title: '', content: '' })
            setIsCreating(false)
            await addPost(createdPost)
        } catch (error) {
            console.error('Ошибка при добавлении новости:', error)
            setPosts(posts)
        }
    }

    const handleDeletePost = async (postId: string) => {
        try {
            const updatedPosts = posts.filter(post => post.id !== postId)
            setPosts(updatedPosts)
            await deletePost(postId)
        } catch (error) {
            console.error('Ошибка при удалении новости:', error)
            setPosts(posts)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-pulse flex space-x-4">
                        <div className="h-12 w-12 rounded-full bg-purple-600 opacity-75"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8 border-b border-purple-500 pb-4">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        NEON<span className="text-cyan-400">NEWS</span>
                    </h1>
                    <div className="flex gap-4">
                        {session && (
                            <button
                                onClick={() => setIsCreating(true)}
                                className="px-4 py-2 bg-transparent border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50"
                            >
                                Создать пост
                            </button>
                        )}
                        <AuthButton />
                    </div>
                </div>

                {isCreating && (
                    <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-purple-500 shadow-lg shadow-purple-500/20">
                        <h2 className="text-xl font-bold mb-4 text-cyan-300">Новый киберпост</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-purple-300 mb-1">
                                    Заголовок
                                </label>
                                <input
                                    type="text"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                    className="w-full p-2 bg-gray-700 border border-purple-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-gray-400"
                                    placeholder="Введите заголовок..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-purple-300 mb-1">
                                    Контент
                                </label>
                                <textarea
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                    className="w-full p-2 bg-gray-700 border border-purple-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-gray-400"
                                    rows={4}
                                    placeholder="Ваш текст здесь..."
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddPost}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                                    disabled={!newPost.title.trim()}
                                >
                                    Опубликовать
                                </button>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 bg-gray-700 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-cyan-400/20">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-500">
                                            <Link href={`/posts/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </h2>
                                        {session && (
                                            <button
                                                onClick={() => handleDeletePost(post.id)}
                                                className="text-pink-500 hover:text-pink-300 text-sm font-mono"
                                                aria-label="Удалить пост"
                                            >
                                                [X]
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-300 mb-4 line-clamp-3 font-mono">{post.content}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-mono bg-gray-700 px-2 py-1 rounded text-cyan-300">@{post.author}</span>
                                        <Link
                                            href={`/posts/${post.id}`}
                                            className="text-sm font-mono text-purple-400 hover:text-cyan-300 hover:underline transition-colors"
                                        >
                                            Читать
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400 font-mono">[ НОВОСТЕЙ НЕ ОБНАРУЖЕНО ]</p>
                            {!session && (
                                <p className="mt-2 text-sm text-gray-500 font-mono"></p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}