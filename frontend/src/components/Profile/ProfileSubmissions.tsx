"use client";

import { Submission } from "@/types/submission"
import { User } from "@/types/user"
import styles from "@/styles/Profile/Submissions.module.css"
import SubmissionContainer from "../Directory/SubmissionContainer";
import { useRef, useState } from "react";
import CreateSubmission from "../Modals/CreateSubmission";
import useDisableScrollbar from "@/utils/useDisableScrollbar";
import NotFound from "../Reusable/NotFound";

export default function ProfileSubmissions(props: {
    user: User | undefined,
    submissions?: Submission[]
}){

    const [submission, setSubmission] = useState<Submission | undefined>(undefined);
    const [disableScrollbar, setDisableScrollbar] = useState(false);
    useDisableScrollbar(disableScrollbar);
    const createRef = useRef<HTMLDivElement>(null);

    return(
        <div className={styles['main-submissions']}>
            <CreateSubmission ref={createRef} submission={submission} setDisable={setDisableScrollbar}  />
            <div className={"flex flex-col gap-0"}>
                <h1 style={{fontFamily: "SpaceGrotesk-Variable"}} className="text-4xl text-white font-semibold">Submissions</h1>
                <p className="text-gray-300 font-normal">View and edit all your submissions here.</p>
            </div>
            <button onClick={() => {
                setSubmission(undefined);
                if(createRef.current) createRef.current.style.display = "flex";
                setDisableScrollbar(true);
            }} className="default-button">Create Submission</button>
            {props.submissions?.length === 0 ?
            <NotFound title="No submissions found." description="You haven't created a submission yet, you should head to directory and start one." />
            :
            <div className={styles['submissions-grid']}>
            {
                props.submissions?.map((submission, index) => {
                    return(
                        <SubmissionContainer isEdit key={index} submission={submission} onClick={() => {
                            setSubmission(submission);
                            if(createRef.current) createRef.current.style.display = "flex";
                            setDisableScrollbar(true);
                        }} />
                    )
                })
            }
            </div>}
        </div>
    )
}