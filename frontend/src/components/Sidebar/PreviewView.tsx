import { useEffect, useRef, useState } from "react"
import { RefreshCw, ExternalLink } from "lucide-react"
import type { CodeArtifact } from "../../store/chat"

interface PreviewViewProps {
    artifact: CodeArtifact
}

export function PreviewView({ artifact }: PreviewViewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [isLoading, setIsLoading] = useState(true)

    const createPreviewContent = (code: string, language: string): string => {
        switch (language.toLowerCase()) {
            case "html":
                return code
            case "css":
                return `
          <!DOCTYPE html>
          <html>
          <head>
            <style>${code}</style>
          </head>
          <body>
            <div class="preview-container">
              <h1>CSS Preview</h1>
              <p>This is a sample paragraph to show your CSS styles.</p>
              <div class="sample-box">Sample Box</div>
              <button>Sample Button</button>
            </div>
          </body>
          </html>
        `
            case "javascript":
                return `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .output { background: #f5f5f5; padding: 10px; border-radius: 4px; margin: 10px 0; }
              .error { background: #ffebee; color: #c62828; }
            </style>
          </head>
          <body>
            <h1>JavaScript Preview</h1>
            <div id="output" class="output"></div>
            <script>
              const output = document.getElementById('output');
              const originalLog = console.log;
              const originalError = console.error;
              
              console.log = (...args) => {
                output.innerHTML += '<div>' + args.join(' ') + '</div>';
                originalLog.apply(console, args);
              };
              
              console.error = (...args) => {
                output.innerHTML += '<div class="error">Error: ' + args.join(' ') + '</div>';
                originalError.apply(console, args);
              };
              
              try {
                ${code}
              } catch (error) {
                console.error(error.message);
              }
            </script>
          </body>
          </html>
        `
            default:
                return `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .message { background: #f5f5f5; padding: 20px; border-radius: 4px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="message">
              <h2>Preview not available</h2>
              <p>Preview is only supported for HTML, CSS, and JavaScript code.</p>
              <p>Current language: <strong>${language}</strong></p>
            </div>
          </body>
          </html>
        `
        }
    }

    const updatePreview = () => {
        if (!iframeRef.current) return

        setIsLoading(true)
        const content = createPreviewContent(artifact.code, artifact.language)
        const blob = new Blob([content], { type: "text/html" })
        const url = URL.createObjectURL(blob)

        iframeRef.current.src = url

        // Clean up the blob URL after iframe loads
        iframeRef.current.onload = () => {
            setIsLoading(false)
            URL.revokeObjectURL(url)
        }
    }

    useEffect(() => {
        updatePreview()
    }, [artifact.code, artifact.language])

    const handleRefresh = () => {
        updatePreview()
    }

    const handleOpenInNewTab = () => {
        const content = createPreviewContent(artifact.code, artifact.language)
        const blob = new Blob([content], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        window.open(url, "_blank")

        // Clean up after a delay
        setTimeout(() => URL.revokeObjectURL(url), 1000)
    }

    return (
        <div className='flex h-full flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-200 p-4'>
                <div>
                    <h3 className='font-semibold text-gray-900'>Preview</h3>
                    <p className='text-sm text-gray-500'>{artifact.title}</p>
                </div>
                <div className='flex items-center space-x-2'>
                    <button
                        onClick={handleRefresh}
                        className='flex items-center space-x-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50'
                        disabled={isLoading}>
                        <RefreshCw
                            className={`h-4 w-4 ${
                                isLoading ? "animate-spin" : ""
                            }`}
                        />
                        <span>Refresh</span>
                    </button>
                    <button
                        onClick={handleOpenInNewTab}
                        className='flex items-center space-x-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50'>
                        <ExternalLink className='h-4 w-4' />
                        <span>Open</span>
                    </button>
                </div>
            </div>

            {/* Preview */}
            <div className='flex-1 bg-white'>
                <iframe
                    ref={iframeRef}
                    className='h-full w-full border-0'
                    sandbox='allow-scripts allow-same-origin'
                    title='Code Preview'
                />
            </div>
        </div>
    )
}
