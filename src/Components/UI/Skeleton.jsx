export default function Skeleton({ className = '', variant='' }) {
    const variants = {
        text: 'title-skeleton',
        box: 'banner-skeleton',
        circle: 'circle-skeleton',
    }
    return <div className={`animate-pulse bg-gray-400 rounded-md ${className} ${variants[variant]} my-3`} />;
}
