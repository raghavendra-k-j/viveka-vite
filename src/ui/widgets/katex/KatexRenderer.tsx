import { useEffect, useRef } from "react";
import katex, { type KatexOptions } from "katex";
import "katex/dist/katex.min.css";

interface KatexRendererProps extends React.HTMLAttributes<HTMLElement> {
    tex: string;
    inline?: boolean;
    katexOptions?: KatexOptions;
}

function KatexRenderer({
    tex,
    inline = false,
    katexOptions,
    ...restProps
}: KatexRendererProps) {
    const spanRef = useRef<HTMLSpanElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = inline ? spanRef.current : divRef.current;
        if (el) {
            katex.render(tex, el, {
                throwOnError: false,
                displayMode: !inline,
                macros: {
                    "\\placeholder": "\\square",
                    ...(katexOptions?.macros || {}),
                },
                ...katexOptions,
                ...katexOptions,
            });
        }
    }, [tex, inline, katexOptions]);

    if (inline) {
        return <span ref={spanRef} {...restProps} />;
    } else {
        return <div ref={divRef} {...restProps} />;
    }
}

export default KatexRenderer;
