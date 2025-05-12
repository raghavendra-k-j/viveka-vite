import clsx from "clsx";
import style from "./../style.module.css";
import type { ReactNode } from "react";

type AppBarProps = {
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function AppBar({ leading, trailing }: AppBarProps) {
  return (
    <div
      className={clsx(
        style.appbar,
        "flex flex-row items-center justify-between shadow-sm min-h-[48px] px-3 py-2"
      )}
    >
      <div className="flex-1">{leading}</div>
      {trailing && <div className="flex-none">{trailing}</div>}
    </div>
  );
}
