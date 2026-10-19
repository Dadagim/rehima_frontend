function EmptyState({message='Nothing yet here'}) {
    return (
        <p className={'text-primary-dark text-center py-10'}>
            {message}
        </p>
    );
}

export default EmptyState;