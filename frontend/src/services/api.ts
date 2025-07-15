const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export interface ChatRequest {
    session_id: string
    message: string
}

export interface ChatResponse {
    data: string
}

class ApiService {
    private baseURL: string

    constructor() {
        this.baseURL = API_BASE_URL
    }

    async sendMessage(
        sessionId: string,
        message: string
    ): Promise<ReadableStream<Uint8Array> | null> {
        try {
            const response = await fetch(`${this.baseURL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    message: message
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return response.body
        } catch (error) {
            console.error("Error sending message:", error)
            throw error
        }
    }

    async streamResponse(
        stream: ReadableStream<Uint8Array>,
        onChunk: (chunk: string) => void,
        onComplete: () => void
    ) {
        const reader = stream.getReader()
        const decoder = new TextDecoder()

        try {
            while (true) {
                const { done, value } = await reader.read()

                if (done) {
                    onComplete()
                    break
                }

                const chunk = decoder.decode(value)
                const lines = chunk.split("\n")

                for (const line of lines) {
                    if (line.startsWith("data:")) {
                        const data = line.slice(5).trim()
                        if (data) {
                            onChunk(data)
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error streaming response:", error)
            throw error
        } finally {
            reader.releaseLock()
        }
    }
}

export const apiService = new ApiService()
