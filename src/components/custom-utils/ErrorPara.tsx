export default function({ className, errorText }:{ errorText: string, className?: string }){
    return(
        <p role="alert" className={`text-sm text-red-600 ${className}`}>{errorText}</p>
    )
}