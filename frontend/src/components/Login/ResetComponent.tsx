"use client"

import { ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/Sign/SignComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function ResetComponent(props: {username?: string, recoveryToken?: string}){
    const [formData, setFormData] = useState({
        username: props.username ?? "",
    });

    const [error, setError] = useState<string | null>();

    const { username} = formData;
    const router = useRouter();
    const [done, setDone] = useState(false);

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSubmit(){
        (async() => {
            const res = await fetch("/api/forgot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username
                })
            });
            const dataReceived = await res.json() as {success?: boolean, message: string, token?: string};

            console.log(dataReceived);

            if(!dataReceived.success){
                setError(dataReceived.message);
            }
            else {
                setDone(true);
            }
        })();
    };


    return(
        <div className={styles['sign-main']}>
            <Link href={"/"}><Image src="/images/HexaLogo.png" alt="" width={100} height={100} /></Link>
            <div className={styles['sign-supporting']}>
                <h1>{done ? "Recovery Link Sent!" : "Update your password"}</h1>
                <span>{done ? "We just sent a recovery link to your discord via DM." : "Enter a new password and hit the confirm button"}</span>
            </div>
            {!done &&
            <>
                <div className={styles['input-row']}>
                    <h5>New Password</h5>
                    <input type="password" name="password" placeholder="Username" value={username} onChange={handleChange} />
                </div>
                <div className={styles['input-row']}>
                    <h5>Confirm New Password</h5>
                    <input type="password" name="password" placeholder="Username" value={username} onChange={handleChange} />
                </div>
                <p>{error}</p>
                <button className="default-button bigger" onClick={handleSubmit}>Confirm Changes</button>
            </>}
        </div>
    )
}
