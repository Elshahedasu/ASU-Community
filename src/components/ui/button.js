export function Button({ children, className, variant, ...props }) {
    const base = "p-2 rounded text-white";
    const color =
        variant === "destructive"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600";

    return (
        <button className={`${base} ${color} ${className}`} {...props}>
            {children}
        </button>
    );
}
