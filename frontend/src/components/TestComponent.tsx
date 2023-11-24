"use client"

import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from "react";

export default function TestComponent(){

    const [data, setData] = useState<{
        username: string;
        password: string;
        discord: string;
      }>(
        {
          username: "",
          password: "",
          discord: ""
        }
    );

    const router = useRouter();

    async function login(){
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const dataReceived = await res.json() as {message?: string, error?: string, token?: string};

        if(dataReceived.error){
            //
        }
        else if(dataReceived.token){
            router.push("/logged")
        }
    }

    function delCookie(){
        try{
            deleteCookie("token");
        }
        catch(err){
            console.log(err);
        }
    }

    console.log(Cookies.get());

    return(
        <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
            <h1>Username</h1>
            <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setData((prev) =>{
            return {...prev, username: event.target.value}
            })} />
            <h1>Password</h1>
            <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setData((prev) =>{
            return {...prev, password: event.target.value}
            })} />
            <h1>Discord</h1>
            <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setData((prev) =>{
            return {...prev, discord: event.target.value}
            })} />
    
            <button onClick={() => login()} >Submit</button>
            <button onClick={() => delCookie()} >Delete Cookie</button>
        </div>
    )
}