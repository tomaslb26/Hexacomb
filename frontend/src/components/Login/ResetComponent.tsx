"use client"

import { ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/Sign/SignComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function ResetComponent(props: {username?: string, recoveryToken?: string}){
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState<string | null>();

    const router = useRouter();
    const [done, setDone] = useState(false);

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSubmit(){

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (formData.password.length < 8) {
            setError("Password should be at least 8 characters long");
            return;
        }

        (async() => {
            const res = await fetch(process.env.LOCAL_URL + "/api/reset_password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: props.username,
                    recoveryToken: props.recoveryToken,
                    password: formData.password,
                })
            });
            const dataReceived = await res.json() as {success?: boolean, message: string, token?: string};

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
            {!done ?
            <Link href={"/"}><Image src="/images/HexaLogo.png" alt="" width={100} height={100} /></Link>
            :
            <Image src="/images/PasswordReset.svg" alt="" width={200} height={200} />
            }
            {!done ?
            <div className={styles['sign-supporting']}>
                <h1>{"Update your password"}</h1>
                <span>{"Enter a new password and hit the confirm button"}</span>
            </div>
            :
            <div className={`${styles['sign-supporting']} ${styles['animate']}`}>
                <h1>{"Password Updated"}</h1>
                <span>{"You've successfully reseted your password, click the button below to login magically."}</span>
            </div>
        }
            {!done &&
            <>
                <div className={styles['input-row']}>
                    <h5>New Password</h5>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <div className={styles['input-row']}>
                    <h5>Confirm New Password</h5>
                    <input type="password" name="confirmPassword" placeholder="Enter Password Again" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <p>{error}</p>
                <button className="default-button bigger" onClick={handleSubmit}>Confirm Changes</button>
            </>}
            {done &&
            <Link className={styles['animate']} href={"/login"}><button className="default-button bigger">Login</button></Link>
            }
        </div>
    )
}
