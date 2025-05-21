
type ErrorMessageProps = React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType;
};

export function ErrorMessage({ as: Component = "span", children, ...props }: ErrorMessageProps) {
    return (
        <Component {...props} className={`text-sm-m text-red-500 ${props.className || ""}`}>
            {children}
        </Component>
    );
}