"use client"

import { ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/Sign/SignComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function LoginComponent(){
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState<string | null>();

    const { username, password } = formData;
    const router = useRouter();

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSubmit(){
        (async() => {
            const res = await fetch(process.env.LOCAL_URL + "/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const dataReceived = await res.json() as {success?: boolean, message: string, token?: string};

            if(!dataReceived.success){
                setError(dataReceived.message);
            }
            else {
                window.location.href = "/";
            }
        })();
    };


    return(
        <div className={styles['sign-main']}>
            <Link href={"/"}><Image src="/images/HexaLogo.png" alt="" width={100} height={100} /></Link>
            <div className={styles['sign-supporting']}>
                <h1>Login to Hexacomb</h1>
                <span>You must be a member of Hexacomb discord.</span>
            </div>
            <div className={styles['input-row']}>
                <h5>Username</h5>
                <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} />
            </div>
            <div className={styles['input-row']}>
                <h5>Password</h5>
                <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                <p className={styles['login']}><Link href={`/forgot${username !== "" ? "?username=" + username : ""}`}><button>Forgot Password?</button></Link></p>
            </div>
            <p>{error}</p>
            <button className="default-button bigger" onClick={handleSubmit}>Login</button>
            <p className={styles['login']}>Don&apos;t have an account? <Link href={"/signup"}><button>Sign Up</button></Link></p>
        </div>
    )
}
