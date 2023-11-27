import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function getUser(token: string){


    const res = await fetch("/api/get_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token}),
        cache: "no-store"
    });


    const dataReceived = await res.json() as {error?: string, username: string, discord: string, verified: boolean, role: string, id: string, avatarUrl: string};
    if(dataReceived.error) return undefined;
    else return dataReceived;

}
