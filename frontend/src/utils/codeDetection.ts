import type { CodeArtifact } from "../store/chat"

export interface DetectedCode {
    code: string
    language: string
    title: string
}

export function detectCodeArtifacts(content: string): DetectedCode[] {
    const artifacts: DetectedCode[] = []

    // Regex to match code blocks with language specification
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

    // Try to extract meaningful title based on language
    switch (language.toLowerCase()) {
        case "html":
            const titleMatch = code.match(/<title>(.*?)<\/title>/i)
            if (titleMatch) return titleMatch[1]
            return "HTML Document"

        case "css":
            return "CSS Styles"

        case "javascript":
        case "js":
            // Look for function names or class names
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

        case "python":
        case "py":
            const pyMatch = firstLine.match(/def\s+(\w+)|class\s+(\w+)/)
            if (pyMatch) {
                const name = pyMatch[1] || pyMatch[2]
                return `Python - ${name}`
            }
            return "Python Code"

        case "java":
            const javaMatch = firstLine.match(
                /class\s+(\w+)|public\s+class\s+(\w+)/
            )
            if (javaMatch) {
                const name = javaMatch[1] || javaMatch[2]
                return `Java - ${name}`
            }
            return "Java Code"

        case "cpp":
        case "c++":
            const cppMatch = firstLine.match(
                /class\s+(\w+)|int\s+main|void\s+(\w+)/
            )
            if (cppMatch) {
                const name = cppMatch[1] || cppMatch[2] || "main"
                return `C++ - ${name}`
            }
            return "C++ Code"

        case "c":
            const cMatch = firstLine.match(/int\s+main|void\s+(\w+)/)
            if (cMatch) {
                const name = cMatch[1] || "main"
                return `C - ${name}`
            }
            return "C Code"

        case "go":
            const goMatch = firstLine.match(/func\s+(\w+)|package\s+(\w+)/)
            if (goMatch) {
                const name = goMatch[1] || goMatch[2]
                return `Go - ${name}`
            }
            return "Go Code"

        case "rust":
        case "rs":
            const rustMatch = firstLine.match(
                /fn\s+(\w+)|struct\s+(\w+)|enum\s+(\w+)/
            )
            if (rustMatch) {
                const name = rustMatch[1] || rustMatch[2] || rustMatch[3]
                return `Rust - ${name}`
            }
            return "Rust Code"

        case "php":
            const phpMatch = firstLine.match(/function\s+(\w+)|class\s+(\w+)/)
            if (phpMatch) {
                const name = phpMatch[1] || phpMatch[2]
                return `PHP - ${name}`
            }
            return "PHP Code"

        case "ruby":
        case "rb":
            const rubyMatch = firstLine.match(/def\s+(\w+)|class\s+(\w+)/)
            if (rubyMatch) {
                const name = rubyMatch[1] || rubyMatch[2]
                return `Ruby - ${name}`
            }
            return "Ruby Code"

        case "swift":
            const swiftMatch = firstLine.match(
                /func\s+(\w+)|class\s+(\w+)|struct\s+(\w+)/
            )
            if (swiftMatch) {
                const name = swiftMatch[1] || swiftMatch[2] || swiftMatch[3]
                return `Swift - ${name}`
            }
            return "Swift Code"

        case "kotlin":
        case "kt":
            const kotlinMatch = firstLine.match(/fun\s+(\w+)|class\s+(\w+)/)
            if (kotlinMatch) {
                const name = kotlinMatch[1] || kotlinMatch[2]
                return `Kotlin - ${name}`
            }
            return "Kotlin Code"

        case "sql":
            const sqlMatch = firstLine.match(
                /CREATE\s+TABLE\s+(\w+)|SELECT.*FROM\s+(\w+)/
            )
            if (sqlMatch) {
                const name = sqlMatch[1] || sqlMatch[2]
                return `SQL - ${name}`
            }
            return "SQL Query"

        case "json":
            return "JSON Data"

        case "xml":
            return "XML Document"

        case "yaml":
        case "yml":
            return "YAML Configuration"

        case "markdown":
        case "md":
            return "Markdown Document"

        case "shell":
        case "bash":
        case "sh":
            return "Shell Script"

        case "powershell":
        case "ps1":
            return "PowerShell Script"

        default:
            return `${language.toUpperCase()} Code`
    }
}
