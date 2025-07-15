import { ChatWindow } from "../Chat/ChatWindow"
import { ChatInput } from "../Chat/ChatInput"
import { Sidebar } from "../Sidebar/Sidebar"
import { ArtifactButton } from "../ArtifactButton"
import { useChat } from "../../store/chat"
import { Bot, Menu, X } from "lucide-react"
import { useState } from "react"

export function MainLayout() {
    const { isSidebarOpen, clearChat } = useChat()
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    return (
        <div className='flex h-screen bg-gray-50'>
            <div
                className={`flex flex-col transition-all duration-300 ${
                    isSidebarOpen ? "md:w-1/2 w-full" : "w-full"
                }`}>
                <header className='border-b border-gray-200 bg-white px-4 py-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500'>
                                <Bot className='h-5 w-5 text-white' />
                            </div>
                            <div>
                                <h1 className='text-lg font-semibold text-gray-900'>
                                    AI Coding Agent
                                </h1>
                                <p className='text-sm text-gray-500'>
                                    Powered by Gemini 2.5
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <button
                                onClick={clearChat}
                                className='rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100'>
                                Clear Chat
                            </button>

                            <button
                                onClick={() =>
                                    setShowMobileMenu(!showMobileMenu)
                                }
                                className='md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100'>
                                {showMobileMenu ? (
                                    <X className='h-5 w-5' />
                                ) : (
                                    <Menu className='h-5 w-5' />
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                <div className='flex flex-1 flex-col'>
                    <ChatWindow />
                    <ChatInput />
                </div>
            </div>

            <Sidebar />
            <ArtifactButton />

            {showMobileMenu && (
                <div className='fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden'>
                    <div className='absolute right-0 top-0 h-full w-80 bg-white shadow-xl'>
                        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
                            <h2 className='text-lg font-semibold'>Menu</h2>
                            <button
                                onClick={() => setShowMobileMenu(false)}
                                className='rounded-md p-2 text-gray-600 hover:bg-gray-100'>
                                <X className='h-5 w-5' />
                            </button>
                        </div>
                        <div className='p-4'>
                            <button
                                onClick={() => {
                                    clearChat()
                                    setShowMobileMenu(false)
                                }}
                                className='w-full rounded-md bg-red-50 px-4 py-2 text-left text-red-700 hover:bg-red-100'>
                                Clear Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
