function Badge({ children, color = 'slate', className = '', ...props }) {
    const colors = {
        slate: 'bg-slate-100 text-slate-700',
        green: 'bg-green-100 text-green-700',
        red: 'bg-red-100 text-red-700',
        amber: 'bg-amber-100 text-amber-700',
    }
    return (
        <span
            className={`${className || 'font-medium rounded-full p-2 inline-block text-xs'} ${colors[color] || colors.slate}`}
            {...props}
        >
            {children}
        </span>
    );
}

export default Badge;