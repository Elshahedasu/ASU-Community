export function Card({ children, className }) {
    return (
        <div className={`bg-white p-5 rounded-xl shadow-md ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ children, className }) {
    return <div className={`p-2 ${className}`}>{children}</div>;
}
