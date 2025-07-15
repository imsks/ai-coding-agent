import type { Message } from "../../store/chat"
import { cn } from "../../utils/cn"
import { User, Bot } from "lucide-react"

interface MessageBubbleProps {
    message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user"
    const isStreaming = message.isStreaming

    return (
        <div
            className={cn(
                "flex gap-3 p-4",
                isUser ? "bg-blue-50" : "bg-white"
            )}>
            <div
                className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    isUser ? "bg-blue-500" : "bg-gray-500"
                )}>
                {isUser ? (
                    <User className='h-4 w-4 text-white' />
                ) : (
                    <Bot className='h-4 w-4 text-white' />
                )}
            </div>

            <div className='flex-1 space-y-2'>
                <div className='flex items-center gap-2'>
                    <span className='font-medium text-gray-900'>
                        {isUser ? "You" : "AI Assistant"}
                    </span>
                    <span className='text-sm text-gray-500'>
                        {message.timestamp.toLocaleTimeString()}
                    </span>
                </div>

                <div className='prose prose-sm max-w-none'>
                    <div
                        className={cn(
                            "whitespace-pre-wrap text-gray-900",
                            isStreaming && "animate-pulse"
                        )}>
                        {message.content || (isStreaming ? "Thinking..." : "")}
                    </div>
                </div>
            </div>
        </div>
    )
}
