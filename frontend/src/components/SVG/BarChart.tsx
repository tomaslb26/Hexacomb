export default function BarChart(props: {className?: string, style?: React.CSSProperties}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className={props.className} style={props.style} viewBox="0 0 20 22" fill="none">
            <path d="M15 8.5V11.9C15 12.4601 15 12.7401 14.891 12.954C14.7951 13.1422 14.6422 13.2951 14.454 13.391C14.2401 13.5 13.9601 13.5 13.4 13.5L1 13.5M11 13.5V16.9C11 17.4601 11 17.7401 10.891 17.954C10.7951 18.1422 10.6422 18.2951 10.454 18.391C10.2401 18.5 9.96005 18.5 9.4 18.5H1M1 1L1 21M1 8.5L17.4 8.5C17.9601 8.5 18.2401 8.5 18.454 8.39101C18.6422 8.29513 18.7951 8.14215 18.891 7.95399C19 7.74008 19 7.46005 19 6.9V5.1C19 4.53995 19 4.25992 18.891 4.04601C18.7951 3.85785 18.6422 3.70487 18.454 3.60899C18.2401 3.5 17.9601 3.5 17.4 3.5L1 3.5L1 8.5Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}