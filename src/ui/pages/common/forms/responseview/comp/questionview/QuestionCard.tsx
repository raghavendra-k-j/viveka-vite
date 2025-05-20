
export function QuestionCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col bg-surface shadow-xs border border-slate-200">
            {children}
        </div>
    );
}