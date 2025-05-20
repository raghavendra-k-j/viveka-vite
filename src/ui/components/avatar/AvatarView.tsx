
export type AvatarViewProps = {
    name: string;
    id: number;
    size?: number;
};

const tailwindColors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
];

// Hash function to map ID to consistent color index
function getColorClassById(id: number): string {
    const index = id % tailwindColors.length;
    return tailwindColors[index];
}

// Extract first character from name
function getInitial(name: string): string {
    return name?.trim()?.charAt(0).toUpperCase() || "?";
}

export function AvatarView({ name, id, size = 40 }: AvatarViewProps) {
    const bgColor = getColorClassById(id);
    const initial = getInitial(name);

    return (
        <div
            className={`flex items-center justify-center rounded-full text-white font-semibold ${bgColor}`}
            style={{ width: size, height: size, fontSize: size * 0.5 }}
            title={name}
        >
            {initial}
        </div>
    );
}
