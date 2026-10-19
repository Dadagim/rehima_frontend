function Input({label, type='text',  error, className='', ...props}) {
    return (
        <div className='flex flex-col gap-1'>
            {label && <label className='text-sm  text-text-muted'>{label}</label>}
            <input
                className={`py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${error ? 'border-red-500': 'border-slate-300'} ${className} `}
                {...props}
                type={type}
            />
            {error && <p className='text-sm  text-red-500'>{error}</p>}
        </div>
    );
}

export default Input;