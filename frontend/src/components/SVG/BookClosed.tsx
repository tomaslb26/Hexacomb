export default function BookClosed(props: {className?: string, style?: React.CSSProperties}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className={props.className} style={props.style} viewBox="0 0 18 22" fill="none">
            <path d="M17 18V15H4C2.34315 15 1 16.3431 1 18M5.8 21H13.8C14.9201 21 15.4802 21 15.908 20.782C16.2843 20.5903 16.5903 20.2843 16.782 19.908C17 19.4802 17 18.9201 17 17.8V4.2C17 3.07989 17 2.51984 16.782 2.09202C16.5903 1.71569 16.2843 1.40973 15.908 1.21799C15.4802 1 14.9201 1 13.8 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}