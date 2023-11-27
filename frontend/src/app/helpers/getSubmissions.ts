import { Submission } from "@/types/submission";
import fetchPonyfill from "fetch-ponyfill";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function getSubmissions(){


    const res = await fetchPonyfill().fetch(process.env.LOCAL_URL + "/api/get_submissions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-store"
    });
    


    const dataReceived = await res.json() as {error?: string, submissions: Submission[], success: boolean, message: string};
    if(dataReceived.error) return undefined;
    else return dataReceived;

}
