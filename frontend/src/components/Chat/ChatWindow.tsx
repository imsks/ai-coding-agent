import { useEffect, useRef } from "react"
import { useChat } from "../../store/chat"
import { MessageBubble } from "./MessageBubble"

export function ChatWindow() {
    const messages = useChat((state) => state.messages)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className='flex h-full flex-col'>
            <div className='flex-1 overflow-y-auto'>
                {messages.length === 0 ? (
                    <div className='flex h-full items-center justify-center'>
                        <div className='text-center'>
                            <div className='mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
                                <svg
                                    className='h-6 w-6 text-gray-400'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-lg font-medium text-gray-900 mb-2'>
                                Welcome to AI Coding Agent
                            </h3>
                            <p className='text-gray-500'>
                                Start a conversation to begin coding with AI
                                assistance.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='space-y-1'>
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    )
}
