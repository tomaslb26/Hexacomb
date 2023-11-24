import { Submission } from "@/types/submission";
import styles from "@/styles/Directory/SubmissionContainer.module.css";
import Image from "next/image";
import { BiExpandAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";




export default function SubmissionContainer(
    props:{
        submission: Submission,
        onClick?: () => void,
        isEdit?: boolean
    }
){
    return(
        <div onClick={() => {
            if(props.onClick) props.onClick()
            }} className={styles['submission-container']}>
            <div className={styles['submission-header']}>
                <h2>{props.submission.title}</h2>
                <p>{props.submission.description.slice(0, 128) + (props.submission.description.length > 128 ? "..." : "")}</p>
            </div>
            <Image src={props.submission.images[0]} width={1000} height={1000} alt="" quality={100}/>
            <button  className={styles['expand']}>{props.isEdit ? <FiEdit /> : <BiExpandAlt />}</button>
        </div>
    )
}