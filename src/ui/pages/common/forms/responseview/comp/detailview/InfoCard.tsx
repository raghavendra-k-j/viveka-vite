import { ReactNode } from "react";



export function InfoCard({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col bg-surface shadow-xs border border-default rounded-sm divide-y divide-default">
            {children}
        </div>
    );
}

export function InfoCardHeader({ title }: { title: string }) {
    return (
        <div className="flex flex-row items-center justify-between px-3 py-2 bg-slate-100 rounded-t-sm">
            <div className="text-sm text-strong font-semibold">{title}</div>
        </div>
    );
}


export function InfoCardItem({ label, value }: { label: ReactNode | string; value: ReactNode | string }) {
    return (
        <div className="flex flex-row gap-1 px-3 py-2 items-center">
            <div className="flex-1 text-sm-m text-default font-medium">{label}</div>
            <div className="flex-1 text-sm-m text-default">{value}</div>
        </div>
    );
}

