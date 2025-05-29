
type FErrorProps = React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType;
};

export function FError({ as: Component = "div", children, ...props }: FErrorProps) {
    return (
        <Component {...props} className={`text-sm text-error ${props.className || ""}`}>
            {children}
        </Component>
    );
}