import { Code, X } from "lucide-react"
import { useChat } from "../store/chat"
import { cn } from "../utils/cn"

export function ArtifactButton() {
    const {
        codeArtifacts,
        isSidebarOpen,
        currentArtifact,
        toggleSidebar,
        setCurrentArtifact
    } = useChat()

    if (codeArtifacts.length === 0) {
        return null
    }

    const latestArtifact = codeArtifacts[codeArtifacts.length - 1]
    const artifactToShow = currentArtifact || latestArtifact

    const handleClick = () => {
        if (!isSidebarOpen) {
            setCurrentArtifact(artifactToShow)
            toggleSidebar()
        } else {
            toggleSidebar()
        }
    }

    return (
        <div className='fixed bottom-4 right-4 z-50'>
            <button
                onClick={handleClick}
                className={cn(
                    "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium shadow-lg transition-colors",
                    isSidebarOpen
                        ? "bg-gray-600 text-white hover:bg-gray-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                )}>
                {isSidebarOpen ? (
                    <>
                        <X className='h-4 w-4' />
                        <span>Close Artifact</span>
                    </>
                ) : (
                    <>
                        <Code className='h-4 w-4' />
                        <span>View Generated Artifact</span>
                    </>
                )}
            </button>
        </div>
    )
}
