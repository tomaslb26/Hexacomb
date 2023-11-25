import { Submission } from "@/types/submission";
import styles from "@/styles/Directory/SubmissionContainer.module.css";
import Image from "next/image";
import { BiExpandAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";




export default function SubmissionContainer(
    props:{
        submission: Submission,
        onClick?: () => void,
        isEdit?: boolean
    }
){

    const {isEdit} = props;
    const [isSaving, setIsSaving] = useState(false);

    function deleteSubmission(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){

        event.stopPropagation();
        event.preventDefault();

        setIsSaving(true);

        (async() => {
            const res = await fetch("/api/delete_submission", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: props.submission.id,
                })
            });

            const dataReceived = await res.json() as {success?: boolean, message: string, id: string};

            if(!dataReceived.success){
                setIsSaving(false);
            }
            else {
                setIsSaving(false);
                window.location.reload();
            }
        })();
    }

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
            {isEdit && <button onClick={deleteSubmission} className="default-button delete" style={{width: "100%"}}>
                {
                    isSaving ? 
                    <>
                        <div className={styles['spinner']}></div>
                        Deleting
                    </> : "Delete"
                }
            </button>}
        </div>
    )
}