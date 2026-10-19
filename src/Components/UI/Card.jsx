function Card({children, className='' ,...props}) {
    return (
        <div className={`rounded-xl border m-5  p-5 border-slate-200 bg-white ${className}`} {...props}>
            {children}
        </div>
    );
}

export default Card;