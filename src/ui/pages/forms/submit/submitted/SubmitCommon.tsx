export function Title({ children }: { children: React.ReactNode }) {
    return <h1 className="text-lg font-semibold text-default mb-2 text-center">{children}</h1>;
}

export function Message({ children }: { children: React.ReactNode }) {
    return <p className="text-secondary text-base mt-2 text-center">{children}</p>;
}

export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-4 sm:p-6 flex justify-center items-start">
            <div className="bg-surface border border-default shadow-lg rounded-sm p-6 w-full max-w-lg">
                {children}
            </div>
        </div>
    );
}
