export default function ErrorPara({ className, errorText }:{ errorText: string, className?: string }){
    return(
        <p role="alert" className={`text-xs text-red-600 ${className}`}>{errorText}</p>
    )
}