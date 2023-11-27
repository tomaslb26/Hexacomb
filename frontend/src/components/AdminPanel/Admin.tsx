"use client";

import { Submission } from "@/types/submission"
import { User } from "@/types/user"
import styles from "@/styles/Profile/Submissions.module.css"
import SubmissionContainer from "../Directory/SubmissionContainer";
import { useRef, useState } from "react";
import CreateSubmission from "../Modals/CreateSubmission";
import useDisableScrollbar from "@/utils/useDisableScrollbar";
import NotFound from "../Reusable/NotFound";
import SubmissionView from "../Modals/SubmissionView";

export default function Admin(props: {
    user: User | undefined,
    submissions?: Submission[]
}){

    const [submissions, setSubmissions] = useState<Submission[] | undefined>(props.submissions);
    const [submission, setSubmission] = useState<Submission | undefined>(undefined);
    const [disableScrollbar, setDisableScrollbar] = useState(false);
    const [saving, setSaving] = useState(false);
    useDisableScrollbar(disableScrollbar);
    const createRef = useRef<HTMLDivElement>(null);

    const [changedSubmissions, setChangedSubmissions] = useState<string[] | undefined>(undefined);

    function handleSubmit(){

        const filteredSubmissions = submissions?.filter((submission) => {
            if(changedSubmissions?.includes(submission.id as string)){
                return submission;
            }
        })
        
        setSaving(true);
        for(const submission of filteredSubmissions as Submission[]){
            (async() => {
                const res = await fetch("/api/update_submission", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(submission)
                });

                const dataReceived = await res.json() as {success?: boolean, message: string, id: string};

                if(submission.id === changedSubmissions?.[changedSubmissions?.length - 1]){
                    setSaving(false);
                    window.location.reload();
                }
            })();
        }




    }

    return(
        <div className={styles['main-submissions']}>
            <SubmissionView disable={disableScrollbar} ref={createRef} submission={submission} setDisable={setDisableScrollbar}  />
            <div className={"flex flex-col gap-0"}>
                <h1 style={{fontFamily: "SpaceGrotesk-Variable"}} className="text-4xl text-white font-semibold">Admin Panel</h1>
                <p className="text-gray-300 font-normal">See everyone&apos;s submissions and change their status.</p>
            </div>
            {changedSubmissions && <button onClick={handleSubmit} className="default-button">
            {
                saving ? 
                <>
                 <div className={styles['spinner']}></div>
                 Saving
                </> : "Save Changes"
            }
            </button>}
            {submissions?.length === 0 ?
            <NotFound title="No submissions found." description="You haven't created a submission yet, you should head to directory and start one." />
            :
            <div className={styles['submissions-grid']}>
            {
                submissions?.map((submission, index) => {
                    return(
                        <SubmissionContainer key={index} submission={submission} onClick={() => {
                            setSubmission(submission);
                            if(createRef.current) createRef.current.style.display = "flex";
                            setDisableScrollbar(true);
                        }} isAdmin onChange={(value : 'ACCEPTED' | 'REJECTED') => {

                            if(submission.status === value) return;

                            setSubmissions((prev) => {
                                const newSubmissions = prev?.map((sub) => {
                                    if(sub.id === submission.id){
                                        return {
                                            ...sub,
                                            status: value
                                        }
                                    }
                                    return sub;
                                });
                                return newSubmissions;
                            }
                            )

                            setChangedSubmissions((prev) => {
                                if(prev && submission.id !== undefined){
                                    return [...prev, submission.id]
                                }
                                else if(submission.id !== undefined) return [submission.id]
                            })
                        }} />
                    )
                })
            }
            </div>}
        </div>
    )
}