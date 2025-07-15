import { useEffect, useRef } from "react"
import { Editor } from "@monaco-editor/react"
import { Download, Copy, Check } from "lucide-react"
import { useState } from "react"
import type { CodeArtifact } from "../../store/chat"
import { cn } from "../../utils/cn"

interface CodeViewProps {
    artifact: CodeArtifact
}

export function CodeView({ artifact }: CodeViewProps) {
    const [copied, setCopied] = useState(false)
    const editorRef = useRef<any>(null)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(artifact.code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy code:", err)
        }
    }

    const handleDownload = () => {
        const extension = getFileExtension(artifact.language)
        const filename = `${artifact.title.replace(/\s+/g, "_")}.${extension}`
        const blob = new Blob([artifact.code], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const getFileExtension = (language: string): string => {
        const extensions: Record<string, string> = {
            javascript: "js",
            typescript: "ts",
            python: "py",
            html: "html",
            css: "css",
            json: "json",
            markdown: "md",
            java: "java",
            cpp: "cpp",
            c: "c",
            go: "go",
            rust: "rs",
            php: "php",
            ruby: "rb",
            swift: "swift",
            kotlin: "kt",
            scala: "scala",
            sql: "sql",
            xml: "xml",
            yaml: "yml",
            shell: "sh",
            bash: "sh",
            powershell: "ps1"
        }
        return extensions[language.toLowerCase()] || "txt"
    }

    return (
        <div className='flex h-full flex-col'>
            <div className='flex items-center justify-between border-b border-gray-200 p-4'>
                <div>
                    <h3 className='font-semibold text-gray-900'>
                        {artifact.title}
                    </h3>
                    <p className='text-sm text-gray-500 capitalize'>
                        {artifact.language}
                    </p>
                </div>
                <div className='flex items-center space-x-2'>
                    <button
                        onClick={handleCopy}
                        className='flex items-center space-x-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50'>
                        {copied ? (
                            <Check className='h-4 w-4 text-green-500' />
                        ) : (
                            <Copy className='h-4 w-4' />
                        )}
                        <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className='flex items-center space-x-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50'>
                        <Download className='h-4 w-4' />
                        <span>Download</span>
                    </button>
                </div>
            </div>

            <div className='flex-1'>
                <Editor
                    height='100%'
                    language={artifact.language}
                    value={artifact.code}
                    theme='vs-light'
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        lineNumbers: "on",
                        folding: true,
                        selectOnLineNumbers: true,
                        automaticLayout: true,
                        fontSize: 14,
                        fontFamily:
                            'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
                    }}
                    onMount={(editor) => {
                        editorRef.current = editor
                    }}
                />
            </div>
        </div>
    )
}
