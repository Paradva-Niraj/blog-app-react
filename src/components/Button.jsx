function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg transition duration-200 ease-in-out 
                ${bgColor} ${textColor} 
                hover:brightness-110 active:scale-95 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
