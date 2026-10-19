const Button = ({variant='primary',children, className='', ...props}) => {
    const base = 'transition-colors py-2 px-4 text-white focus:outline-none disabled:opacity-50'
    const variants = {
        primary: 'btn-primary',
        outline: 'bt-outline',
        ghost: 'btn-ghost',
    }

    return (
        <button className={`${className} ${base} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;