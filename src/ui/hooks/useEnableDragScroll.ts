import { useEffect, RefObject } from "react";

export function useEnableDragScroll(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref || !ref.current) return;

        const el = ref.current;
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        const startDrag = (clientX: number) => {
            isDown = true;
            el.classList.add("active");
            startX = clientX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
        };

        const moveDrag = (clientX: number) => {
            if (!isDown) return;
            const x = clientX - el.offsetLeft;
            const walk = (x - startX);
            el.scrollLeft = scrollLeft - walk;
        };

        const endDrag = () => {
            isDown = false;
            el.classList.remove("active");
        };

        const onMouseDown = (e: MouseEvent) => startDrag(e.pageX);
        const onMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            moveDrag(e.pageX);
        };

        const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].pageX);
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            moveDrag(e.touches[0].pageX);
        };

        el.addEventListener("mousedown", onMouseDown);
        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseup", endDrag);
        el.addEventListener("mouseleave", endDrag);
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        el.addEventListener("touchend", endDrag);

        return () => {
            el.removeEventListener("mousedown", onMouseDown);
            el.removeEventListener("mousemove", onMouseMove);
            el.removeEventListener("mouseup", endDrag);
            el.removeEventListener("mouseleave", endDrag);
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", endDrag);
        };
    }, [ref]);
}
