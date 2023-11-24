import styles from "@/styles/Reusable/Dropdown.module.css";
import capitalizeWords from "@/utils/capitalizeWords";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";


export default function Dropdown(props: {
    options: string[],
    selected: string,
    setSelected: (value: string) => void,
    isBlock?: boolean,
    skeleton?: boolean,
    input?: boolean,
    isPlayer?: boolean
}){

    const {isBlock = true, skeleton = false, input=true} = props;
    const ref = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const toggleMenu = () => {
        if(ref.current && !ref.current.classList.contains(styles['active'])){
            ref.current.classList.toggle(styles['active']);
            inputRef.current?.focus();
        }
        else{
            ref.current?.classList.remove(styles['active']);
        }
    }

    const [written, setWritten] = useState<string>("");

    return(
        <div className={`${styles['dropdown-container']} ${skeleton ? styles['skeleton'] : ""}`}>
            <div onClick={() => {
                if(!skeleton) toggleMenu();
            }} style={{padding: props.options.length < 5 ? "12px 24px" : ""}} className={styles['dropdown-wrapper']}>
                {isBlock && <Image src={`/images/Blocks/${props.selected.toLowerCase().replaceAll(" ", "_")}.png`} width={20} height={20} alt="" />}
                <span>{capitalizeWords(props.selected.replaceAll("_", " "))}</span>
                <FaCaretDown />
            </div>
            <div style={{height: props.options.length < 5 ? "fit-content" : "", overflow: props.options.length < 5 ? "auto" : ""}} ref={ref} className={styles['dropdown-options']}>
                {input && <input ref={inputRef} type="text" placeholder="Search..." onChange={(event: ChangeEvent<HTMLInputElement>) => setWritten(event.target.value)} value={written} />}
                {props.options.filter((item) => {
                    return item.toLowerCase().includes(written.toLowerCase());
                }).map((option, i) => {
                    return(
                        <div key={`option-${i}`} className={`${styles['dropdown-option']} ${props.selected === option ? styles['selected'] : ""}`} onClick={() => {
                            props.setSelected(option);
                            toggleMenu();
                            setWritten("");
                        }}>
                            {( isBlock || props.isPlayer) && <Image src={isBlock ? `/images/Blocks/${option.toLowerCase().replaceAll(" ", "_")}.png` : `/images/Heads/${option}.jpg`} width={20} height={20} alt="" />}
                            <span>{capitalizeWords(option)}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}