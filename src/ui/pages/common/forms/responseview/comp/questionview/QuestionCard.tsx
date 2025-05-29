
export function QuestionCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-start bg-surface shadow-sm border border-default px-4 sm:px-6">
            {children}
        </div>
    );
}