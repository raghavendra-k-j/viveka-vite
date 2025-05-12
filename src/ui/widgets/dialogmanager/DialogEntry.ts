import type { ComponentType } from "react";

export type DialogEntry<T = any> = {
    id: string;
    component: ComponentType<T>;
    props: T;
};