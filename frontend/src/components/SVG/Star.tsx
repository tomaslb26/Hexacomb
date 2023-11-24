export interface StarProps {
    style?: React.CSSProperties;
    className?: string;
}

export default function Star({ style, className }: StarProps){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" style={style} className={className} viewBox="0 0 22 22" fill="none">
            <path d="M21 11H19M18.071 18.0711L16.6567 16.6569M3 11H1M5.34292 5.34317L3.92871 3.92896M11 3V1M16.6567 5.34317L18.071 3.92896M11 21V19M3.92871 18.0711L5.34292 16.6569M11 6L12.545 9.13L16 9.635L13.5 12.07L14.09 15.51L11 13.885L7.91 15.51L8.5 12.07L6 9.635L9.455 9.13L11 6Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}