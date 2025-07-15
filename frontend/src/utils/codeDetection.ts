export interface DetectedCode {
    code: string
    language: string
    title: string
}

export function detectCodeArtifacts(content: string): DetectedCode[] {
    const artifacts: DetectedCode[] = []

    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
        const language = match[1] || "text"
        const code = match[2].trim()

        if (code.length > 0) {
            const title = generateTitle(code, language)
            artifacts.push({
                code,
                language: language.toLowerCase(),
                title
            })
        }
    }

    return artifacts
}

function generateTitle(code: string, language: string): string {
    const lines = code.split("\n")
    const firstLine = lines[0].trim()

    switch (language.toLowerCase()) {
        case "html":
            const titleMatch = code.match(/<title>(.*?)<\/title>/i)
            if (titleMatch) return titleMatch[1]
            return "HTML Document"

        case "css":
            return "CSS Styles"

        case "javascript":
        case "js":
            const functionMatch = firstLine.match(
                /function\s+(\w+)|const\s+(\w+)\s*=|class\s+(\w+)/
            )
            if (functionMatch) {
                const name =
                    functionMatch[1] || functionMatch[2] || functionMatch[3]
                return `JavaScript - ${name}`
            }
            return "JavaScript Code"

        case "typescript":
        case "ts":
            const tsMatch = firstLine.match(
                /function\s+(\w+)|const\s+(\w+)\s*=|class\s+(\w+)|interface\s+(\w+)|type\s+(\w+)/
            )
            if (tsMatch) {
                const name =
                    tsMatch[1] ||
                    tsMatch[2] ||
                    tsMatch[3] ||
                    tsMatch[4] ||
                    tsMatch[5]
                return `TypeScript - ${name}`
            }
            return "TypeScript Code"
        case "py":
            const pyMatch = firstLine.match(/def\s+(\w+)|class\s+(\w+)/)
            if (pyMatch) {
                const name = pyMatch[1] || pyMatch[2]
                return `Python - ${name}`
            }
            return "Python Code"

        default:
            return `${language.toUpperCase()} Code`
    }
}
