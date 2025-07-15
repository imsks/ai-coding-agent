import { Code, Eye } from "lucide-react"
import { useChat } from "../../store/chat"
import { cn } from "../../utils/cn"

export function ToggleGroup() {
    const { sidebarView, setSidebarView } = useChat()

    const toggleOptions = [
        { value: "code" as const, label: "Code", icon: Code },
        { value: "preview" as const, label: "Preview", icon: Eye }
    ]

    return (
        <div className='flex rounded-lg border border-gray-300 bg-gray-50 p-1'>
            {toggleOptions.map(({ value, label, icon: Icon }) => (
                <button
                    key={value}
                    onClick={() => setSidebarView(value)}
                    className={cn(
                        "flex flex-1 items-center justify-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        sidebarView === value
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                    )}>
                    <Icon className='h-4 w-4' />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    )
}
