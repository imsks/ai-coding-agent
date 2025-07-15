import { useState, type KeyboardEvent } from "react"
import { Send, Loader2 } from "lucide-react"
import { useChat } from "../../store/chat"
import { apiService } from "../../services/api"
import { cn } from "../../utils/cn"
import { detectCodeArtifacts } from "../../utils/codeDetection"

export function ChatInput() {
    const [message, setMessage] = useState("")
    const {
        sessionId,
        addMessage,
        updateLastMessage,
        setStreaming,
        addCodeArtifact
    } = useChat()

    const handleSend = async () => {
        if (!message.trim() || useChat.getState().isStreaming) return

        const userMessage = message.trim()
        setMessage("")

        // Add user message
        addMessage({
            role: "user",
            content: userMessage
        })

        // Add assistant message placeholder
        addMessage({
            role: "assistant",
            content: "",
            isStreaming: true
        })

        setStreaming(true)

        try {
            const stream = await apiService.sendMessage(sessionId, userMessage)

            if (stream) {
                await apiService.streamResponse(
                    stream,
                    (chunk) => {
                        updateLastMessage(chunk)
                    },
                    () => {
                        setStreaming(false)
                        // Update the last message to remove streaming state
                        const messages = useChat.getState().messages
                        if (messages.length > 0) {
                            const lastMessage = messages[messages.length - 1]
                            if (lastMessage.role === "assistant") {
                                useChat.getState().messages[
                                    messages.length - 1
                                ] = {
                                    ...lastMessage,
                                    isStreaming: false
                                }

                                // Detect and add code artifacts
                                const artifacts = detectCodeArtifacts(
                                    lastMessage.content
                                )
                                artifacts.forEach((artifact) => {
                                    addCodeArtifact({
                                        code: artifact.code,
                                        language: artifact.language,
                                        title: artifact.title,
                                        messageId: lastMessage.id
                                    })
                                })
                            }
                        }
                    }
                )
            }
        } catch (error) {
            console.error("Error sending message:", error)
            setStreaming(false)
            // Update last message with error
            updateLastMessage(
                "\n\nError: Failed to get response. Please try again."
            )
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const isStreaming = useChat((state) => state.isStreaming)

    return (
        <div className='border-t border-gray-200 bg-white p-4'>
            <div className='flex items-end space-x-4'>
                <div className='flex-1'>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder='Type your message here...'
                        className='w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        rows={1}
                        disabled={isStreaming}
                    />
                </div>
                <button
                    onClick={handleSend}
                    disabled={!message.trim() || isStreaming}
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                        message.trim() && !isStreaming
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}>
                    {isStreaming ? (
                        <Loader2 className='h-5 w-5 animate-spin' />
                    ) : (
                        <Send className='h-5 w-5' />
                    )}
                </button>
            </div>
        </div>
    )
}
