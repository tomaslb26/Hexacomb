import { ForwardedRef, forwardRef } from "react";
import styles from "@/styles/Modals/WhitelistSubmission.module.css";
import Link from "next/link";

const CreateSubmission = forwardRef<HTMLDivElement, {
    setDisable: React.Dispatch<React.SetStateAction<boolean>>,
}
>
((props, ref: ForwardedRef<HTMLDivElement>) => {

    return(
        <div style={{display: "flex"}} className="modal-wrapper">
            <div className={styles['modal-container']}>
                <div className={styles['modal-header']}>
                    <h1>Hexacomb Community Whitelist Application</h1>
                    <p>
                    Welcome to the Hexacomb Whitelist Application.
                    </p>
                    <p>
                    Before we get started, please ensure that you have joined our Discord.
                    </p>
                    <p>
                    The following link should take you there: <Link href={"https://discord.gg/eyf7T37xck"}>Discord Link</Link>
                    </p>
                    <p>
                    Done that? Great!
                    </p>
                    <p>
                    Now grab some popcorn and read through the whitelist guide (#1-whitelist-guide) and the FAQ (#3-whitelist-faq). Please make sure that you fully understand how our whitelist process works before proceeding. 
                    </p>    
                    <p>
                    If you have any questions about the application or the whitelist process here, please do not be afraid to ask in the whitelist chat in Discord (#2-whitelist-chat).
                    </p>
                    <p>
                    Notes:
                    <br />
                    Upon submitting your applications, you will not be able to edit it later on.
                    <br />
                    Please do not tag Hexacomb Staff or Interview Team about the status of your application, unless it has been over 72 hours.
                    </p>
                    <p>
                    Good luck & Thanks for your interest in Hexacomb SMP!
                    </p>
                </div>
                <form className={styles['modal-form']}>
                    <div className={styles['input-row']}>
                        <label htmlFor="discord-username">Discord Username</label>
                        <input type="text" id="discord-username" />
                    </div>
                    <div className={styles['input-row']}>
                        <label htmlFor="discord-username">How did you find about Hexacomb SMP?</label>
                        <textarea id="discord-username" />
                    </div>
                </form>
            </div>
        </div>
    )

})

CreateSubmission.displayName = "CreateSubmission";
export default CreateSubmission;
