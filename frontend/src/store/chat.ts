import { create } from "zustand"

export interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
    isStreaming?: boolean
}

export interface CodeArtifact {
    id: string
    code: string
    language: string
    title: string
    messageId: string
}

export interface ChatState {
    sessionId: string
    messages: Message[]
    codeArtifacts: CodeArtifact[]
    isSidebarOpen: boolean
    sidebarView: 'code' | 'preview'
    currentArtifact: CodeArtifact | null
    isStreaming: boolean
    
    // Actions
    addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
    updateLastMessage: (content: string) => void
    addCodeArtifact: (artifact: Omit<CodeArtifact, 'id'>) => void
    toggleSidebar: () => void
    setSidebarView: (view: 'code' | 'preview') => void
    setCurrentArtifact: (artifact: CodeArtifact | null) => void
    setStreaming: (streaming: boolean) => void
    clearChat: () => void
}

export const useChat = create<ChatState>((set, get) => ({
    sessionId: crypto.randomUUID(),
    messages: [],
    codeArtifacts: [],
    isSidebarOpen: false,
    sidebarView: 'code',
    currentArtifact: null,
    isStreaming: false,
    
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, {
            ...message,
            id: crypto.randomUUID(),
            timestamp: new Date()
        }]
    })),
    
    updateLastMessage: (content) => set((state) => ({
        messages: state.messages.map((msg, index) => 
            index === state.messages.length - 1 
                ? { ...msg, content: msg.content + content }
                : msg
        )
    })),
    
    addCodeArtifact: (artifact) => set((state) => ({
        codeArtifacts: [...state.codeArtifacts, {
            ...artifact,
            id: crypto.randomUUID()
        }]
    })),
    
    toggleSidebar: () => set((state) => ({
        isSidebarOpen: !state.isSidebarOpen
    })),
    
    setSidebarView: (view) => set({ sidebarView: view }),
    
    setCurrentArtifact: (artifact) => set({ currentArtifact: artifact }),
    
    setStreaming: (streaming) => set({ isStreaming: streaming }),
    
    clearChat: () => set({
        messages: [],
        codeArtifacts: [],
        isSidebarOpen: false,
        currentArtifact: null
    })
}))
