import { X } from "lucide-react"
import { useChat } from "../../store/chat"
import { CodeView } from "./CodeView"
import { PreviewView } from "./PreviewView"
import { ToggleGroup } from "./ToggleGroup"
import React from "react"

export function Sidebar() {
    const { isSidebarOpen, sidebarView, currentArtifact, toggleSidebar } =
        useChat()

    if (!isSidebarOpen || !currentArtifact) {
        return null
    }

    return (
        <React.Fragment>
            <div
                className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
                onClick={toggleSidebar}
            />

            <div className='flex h-full w-full md:w-1/2 flex-col border-l border-gray-200 bg-white md:relative fixed top-0 right-0 z-40'>
                <div className='flex items-center justify-between border-b border-gray-200 p-4'>
                    <h2 className='text-lg font-semibold text-gray-900'>
                        Code Artifact
                    </h2>
                    <button
                        onClick={toggleSidebar}
                        className='rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
                        <X className='h-5 w-5' />
                    </button>
                </div>

                <div className='border-b border-gray-200 p-4'>
                    <ToggleGroup />
                </div>

                <div className='flex-1 overflow-hidden'>
                    {sidebarView === "code" ? (
                        <CodeView artifact={currentArtifact} />
                    ) : (
                        <PreviewView artifact={currentArtifact} />
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}
