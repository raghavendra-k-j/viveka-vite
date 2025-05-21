import clsx from "clsx";
import styles from "./styles.module.css";

export const avatarClasses = [
    "bg-teal-400",
    "bg-blue-400",
    "bg-rose-400",
    "bg-amber-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-orange-400",
    "bg-cyan-400",
    "bg-indigo-400",
    "bg-lime-400",
    "bg-emerald-400",
    "bg-fuchsia-400",
    "bg-violet-400",
    "bg-yellow-400",
    "bg-red-400",
];



export const AvatarView = ({
    id,
    name,
    fontSize,
}: {
    id: number;
    name: string;
    fontSize?: number | string;
}) => {
    const colorClass = avatarClasses[id % avatarClasses.length];
    return (
        <div
            className={clsx(styles.avatarLetter, colorClass, "text-white")}
            style={fontSize ? { fontSize } : undefined}
        >
            {name?.charAt(0) ?? ""}
        </div>
    );
};