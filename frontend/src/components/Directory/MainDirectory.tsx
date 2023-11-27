"use client";

import styles from "@/styles/Directory/Main.module.css"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Dropdown from "../Reusable/Dropdown";
import { mcObjects } from "@/types/minecraftObjects";
import { Submission } from "@/types/submission";
import CreateSubmission from "../Modals/CreateSubmission";
import SubmissionContainer from "./SubmissionContainer";
import SubmissionView from "../Modals/SubmissionView";
import useDisableScrollbar from "@/utils/useDisableScrollbar";
import { User } from "@/types/user";
import { HiPlus } from "react-icons/hi";
import Folder from "../SVG/Folder";
import Link from "next/link";
import NotFound from "../Reusable/NotFound";
import { useRouter } from "next/navigation";

export default function MainDirectory(props: {
    submissions?: Submission[],
    user?: User,
    isNew?: boolean
}) {


    const {submissions, user, isNew} = props;

    useEffect(() => {
        if(isNew){
            setDisableScrollbar(true);
            if(createRef.current){
                createRef.current.style.display = 'flex';
            }
        }
    }, [isNew])

    const [search, setSearch] = useState<{
        query: string,
        type: "SHOP" | "POI" | undefined,
        sort: "NEWEST" | "OLDEST",
        item: string
    }>({
        query: "",
        type: undefined,
        sort: "NEWEST",
        item: ""
    })

    function isQueried(submission: Submission){
        if(search.query === "") return true;
        if(submission.title.toLowerCase().includes(search.query.toLowerCase())) return true;
        for(let item of submission.items){
            if(item.item.toLowerCase().includes(search.query.toLowerCase())) return true;
        }
        return false;
    }

    function isItemInSubmission(submission: Submission){
        if(search.item === "") return true;
        for(let item of submission.items){
            if(item.item === search.item) return true;
        }
        return false;
    }

    const [submissionView, setSubmissionView] = useState<Submission | undefined>(undefined);

    const viewerRef = useRef<HTMLDivElement>(null);
    const createRef = useRef<HTMLDivElement>(null);
    const [disableScrollbar, setDisableScrollbar] = useState(false);
    useDisableScrollbar(disableScrollbar);

    return(
        <div className={styles['directory-main']}>
            <SubmissionView submission={submissionView} ref={viewerRef} setDisable={setDisableScrollbar} disable={disableScrollbar} />
            <CreateSubmission setDisable={setDisableScrollbar} ref={createRef} />
            <Image src="/images/Layers.gif" width={120} height={120} alt=""/>
            <div className={styles['directory-header']}>
                <h1>Directory</h1>
                <p>Explore the different submissions posted by the members of Hexacomb, discover new shops to spend your diamonds or points of interest</p>
            </div>
            <div className={styles['directory-search']}>
                {user !== undefined && <div className={styles['buttons']}>
                <button onClick={() => {
                    setDisableScrollbar(true);
                    if(createRef.current){
                        createRef.current.style.display = 'flex';
                    }
                }} className="default-button"><HiPlus /> Create Submission</button>
                <Link href={"/profile/submissions"}><button className="default-button"><Folder /> See Submissions</button></Link>
                </div>}
                {submissions && submissions?.length > 0 
                &&
                <>
                    <input onChange={
                        (e) => {
                            setSearch((prev) => {
                                return {
                                    ...prev,
                                    query: e.target.value
                                }
                            })
                        }
                    } value={search.query} type="text" placeholder="Search for something"/>
                    <div className={styles['search-row']}>
                        <button onClick={() => {
                            setSearch((prev) => {
                                return {
                                    ...prev,
                                    type: "SHOP"
                                }
                            })
                        }} className={`${search.type === "SHOP" ? styles['selected'] : ""}`}>Shop</button>
                        <button onClick={() => {
                            setSearch((prev) => {
                                return {
                                    ...prev,
                                    type: "POI"
                                }
                            })
                        }} className={`${search.type === "POI" ? styles['selected'] : ""}`}>Point of Interest</button>
                        {search.type === "SHOP" && <Dropdown
                        options={mcObjects} selected={search.item === "" ? "Select an item" : search.item}
                        isBlock={false}
                        setSelected={(value: string) => {
                            setSearch((prev) => {
                                return {
                                    ...prev,
                                    item: value
                                }
                            })
                        }} />}
                    </div>
                </>}
            </div>
            {submissions?.length === 0 ?
            <NotFound title="No submissions found." description="There are no submissions yet, you have to wait until someone creates one." />
            :
            <div className={styles['directory-body']}>
                {submissions?.filter((submission) => isQueried(submission) && isItemInSubmission(submission) && (!search.type || submission.type === search.type))
                .map((submission, index) => {
                    return <SubmissionContainer onClick={() => {
                        setDisableScrollbar(true);
                        setSubmissionView(submission);
                        if(viewerRef.current){
                            viewerRef.current.style.display = 'flex';
                        }
                    }} key={index} submission={submission} />
                })}
            </div>}
        </div>
    )
}