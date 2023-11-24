import { Submission } from "@/types/submission";
import React, { forwardRef, ForwardedRef } from "react";
import styles from "@/styles/Modals/SubmissionView.module.css";
import Image from "next/image";
import { BiCollapseAlt } from "react-icons/bi";
import useDisableScrollbar from "@/utils/useDisableScrollbar";


const SubmissionView = forwardRef<HTMLDivElement, {
    submission: Submission | undefined,
    setDisable: React.Dispatch<React.SetStateAction<boolean>>,
    disable: boolean
}
>
((props, ref: ForwardedRef<HTMLDivElement>) => {

    const { submission, setDisable } = props;

    const collapse = () => {
        if (typeof ref === 'function') {
          ref(null); // Handle the callback ref function case
        } else if (ref && ref.current) {
            setDisable(false);
            ref.current.style.display = 'none'; // Access the current property of the mutable ref object
        }
    };


    return (
        <div ref={ref} className="modal-wrapper">
            {props.disable &&
            <div className={styles['submission-view']}>
                <div className={styles['header']}>
                    <h1>{submission?.title}</h1>
                    <h2>Player: {submission?.mcName}</h2>
                </div>
                <p>{submission?.description}</p>
                <div className={styles['items']}>
                    {submission?.items.map((item, index) => {
                        return (
                            <div key={index} className={styles['item']}>
                                <Image src={`/images/Blocks/${item.item.toLowerCase().replaceAll(" ", "_")}.png`} width={120} height={120} alt=""/>
                                <p className={styles['name']}>{item.item}</p>
                                <p>{item.price}</p>
                            </div>
                        )
                    })}
                </div>
                <div className={styles['images']}>
                    {
                        submission?.images.map((image, index) => {
                            return (
                                <Image key={index} className={styles['image']} src={image} width={1000} height={1000} alt="" />
                            )
                        })
                    }
                </div>
                <button onClick={() => collapse()} className={styles['collapse']}>
                    <BiCollapseAlt />
                </button>
            </div>}
        </div>
    );
});

SubmissionView.displayName = 'SubmissionView';

export default SubmissionView;