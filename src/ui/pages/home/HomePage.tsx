import AppBarLogo from "~/ui/components/AppBarLogo";
import { AppBar } from "../forms/submit/comp/AppBar";
import katex from "katex";
import "katex/dist/katex.min.css";


export default function HomePage() {
    return (
        <div className="flex flex-col h-screen">
            {/* Fixed height AppBar */}
            <div className="h-14">
                <AppBar leading={<AppBarLogo />} />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 min-h-0 border-2 border-red-500">
                {/* Sidebar */}
                <div className="w-1/5 overflow-y-auto border-r border-gray-300 p-2 min-h-0">
                    <ScrollableList count={10} label="Sidebar" />
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-4 border-x border-gray-300 min-h-0">
                    <ScrollableList count={10} label="Main" />
                </div>

                {/* Right Panel */}
                <div className="w-1/4 overflow-y-auto border-l border-gray-300 p-2 min-h-0">
                    <ScrollableList count={10} label="Right" />
                </div>
            </div>
        </div>
    );
}



export function ScrollableList({ count, label }: { count: number; label: string }) {
    const katexString = "e = mc^2";
    const katexHtml = katex.renderToString(katexString, {
        throwOnError: false,
        displayMode: true,
    });

    return (
        <div className="space-y-2">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="p-2 bg-white border border-gray-300 rounded shadow-sm"
                >
                    <div dangerouslySetInnerHTML={{ __html: katexHtml }} />
                    <div>{label} Item #{index + 1}</div>
                </div>
            ))}
        </div>
    );
}