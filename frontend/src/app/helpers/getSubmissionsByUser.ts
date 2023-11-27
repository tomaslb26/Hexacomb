import { Submission } from "@/types/submission";
import fetchPonyfill from "fetch-ponyfill";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function getSubmissionsByUser(username: string){
    const res = await fetchPonyfill().fetch(process.env.LOCAL_URL + "/api/get_submissions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
        })
    });
    
    const dataReceived = await res.json() as {error?: string, submissions: Submission[], success: boolean, message: string};
    if(dataReceived.error) return undefined;
    else return dataReceived;

}
