import { Code, Eye, X } from "lucide-react"
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

    // Don't show button if no artifacts exist
    if (codeArtifacts.length === 0) {
        return null
    }

    // Get the latest artifact if no current artifact is selected
    const latestArtifact = codeArtifacts[codeArtifacts.length - 1]
    const artifactToShow = currentArtifact || latestArtifact

    const handleClick = () => {
        if (!isSidebarOpen) {
            // Open sidebar and set current artifact
            setCurrentArtifact(artifactToShow)
            toggleSidebar()
        } else {
            // Close sidebar
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
