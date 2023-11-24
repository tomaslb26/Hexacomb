"use client";

import { ChangeEvent, useState } from "react";
import styles from "@/styles/Sign/SignComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function SignComponent(){
    const [formData, setFormData] = useState({
        username: "",
        discordName: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState<string | null>();

    const { username, discordName, password, confirmPassword } = formData;
    const router = useRouter();

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSubmit(){
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }
        if (password.length < 8) {
            console.log("Password should be at least 8 characters long");
            return;
        }
        if (!username || !discordName || !password || !confirmPassword) {
            return;
        }


        (async() => {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    discord: discordName,
                    password
                })
            });
            const dataReceived = await res.json() as {success?: boolean, message: string, token?: string};

            if(!dataReceived.success){
                setError(dataReceived.message);
            }
            else {
                window.location.href = "/2fa";
            }
        })();
    };

    return(
        <div className={styles['sign-main']}>
            <Link href={"/"}><Image src="/images/HexaLogo.png" alt="" width={100} height={100} /></Link>
            <div className={styles['sign-supporting']}>
                <h1>Sign in to Hexacomb</h1>
                <span>You must be a member of Hexacomb discord.</span>
            </div>
            <div className={styles['input-row']}>
                <h5>Username</h5>
                <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} />
            </div>
            <div className={styles['input-row']}>
                <h5>Discord Name</h5>
                <input type="text" name="discordName" placeholder="Must be your discord username" value={discordName} onChange={handleChange} />
            </div>
            <div className={styles['input-row']}>
                <h5>Password</h5>
                <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
            </div>
            <div className={styles['input-row']}>
                <h5>Confirm Password</h5>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} />
            </div>
            <p>{error}</p>
            <button className="default-button bigger" onClick={handleSubmit}>Sign In</button>
            <p className={styles['login']}>Already have an account? <Link href={"/login"}><button>Login</button></Link></p>
        </div>
    )
}
