"use client";

import { User } from "@/types/user";
import styles from "@/styles/2FA/Main.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CodeInsertPanel(props : {user: User}){

    const numInputs = 4;
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    inputRefs.current = Array.from({ length: numInputs }, () => null);



    const [code, setCode] = useState(["", "", "", ""]);
    const [sendingNewCode, setSendingNewCode] = useState<undefined | boolean>(undefined);

    const [error, setError] = useState<string | null>();

    const router = useRouter();

    function changeValue(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        if ((e.key >= '0' && e.key <= '9') || e.key === 'Backspace') {
          // Allow numeric input and backspace to trigger the change event
          const newValue = e.key === 'Backspace' ? '' : e.key;
          const newCode = [...code];
          newCode[index] = newValue;
          setCode(newCode);
      
          if (e.key === 'Backspace' && index > 0) {
            // Handle backspace
            inputRefs.current[index - 1]?.focus();
          } else if (index < numInputs - 1 && e.key !== 'Backspace') {
            inputRefs.current[index + 1]?.focus();
          }
          e.preventDefault(); // Prevent the input value from changing
        }
    }

    function verifyCode(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        e.preventDefault();

        console.log(code.join(""));

        (async() => {
            const res = await fetch("/api/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username : props.user.username,
                    code : code.join("")
                })
            });
            const dataReceived = await res.json() as {success?: boolean, message: string};

            if(!dataReceived.success){
                setError(dataReceived.message);
            }
            else {
                router.push("/")
            }
        })();
    }

    function sendNewCode(){
        (async() => {
            const res = await fetch("/api/send_code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username : props.user.username,
                })
            });
            const dataReceived = await res.json() as {success?: boolean, message: string};

            if(!dataReceived.success){
                setError(dataReceived.message);
            }
            else {
                window.location.href = "/";
            }
        })();

    }


    return(
        <div className={styles['main']}>
            <Link href={"/"}><Image src="/images/HexaLogo.png" alt="" width={100} height={100} /></Link>
            <div className={styles['sign-supporting']}>
                <h1>Verify your identity</h1>
                <span>If you&apos;re a member of Hexacomb, you must have received a message from our bot.</span>
            </div>
            <form onSubmit={verifyCode} className={styles['content']}>
                <div className={styles['content-grid']}>
                {inputRefs.current.map((_ : any, index : number) => (
                    <input 
                        style={{border: code[index] === "" ? "2px solid white" : "2px solid var(--success-400)"}}
                        ref={(el) => inputRefs.current[index] = el} 
                        value={code[index]} 
                        key={index}
                        type="text" 
                        maxLength={1} 
                        className={styles['code-input']}  
                        onKeyDown={(event : React.KeyboardEvent<HTMLInputElement>) => {
                                changeValue(event, index);
                        }}
                    />
                ))}
                </div>
                <button type="submit" className="default-button bigger">Verify Code</button>
                <p>Didn&apos;t get the code? <button type="button" onClick={() => sendNewCode()}>Click here to send a new code</button></p>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    )
}