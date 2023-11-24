import { Submission } from "@/types/submission";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

    try {
        // Make a POST request to the demo API with the Bearer token
        const apiRes = await fetch(`${process.env.BACKEND_URL}api/v1/submission/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        // Parse the response from the API
        const dataReceived = await apiRes.json() as { submissions: Submission[], success: boolean, message: string, error?: string  };
        const resA = NextResponse.json(dataReceived);
        return resA;
    
    } catch (err) {
        // Handle any errors that occur during the process
        console.error(err);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

export async function POST(req: NextRequest){

    try {
        const body = await req.json();
        // Make a POST request to the demo API with the Bearer token
        const apiRes = await fetch(`${process.env.BACKEND_URL}api/v1/submission/get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": body.username,
            }),
            cache: "no-store"
        });

        // Parse the response from the API
        const dataReceived = await apiRes.json() as { submissions: Submission[], success: boolean, message: string, error?: string  };
        const resA = NextResponse.json(dataReceived);
        return resA;
    
    } catch (err) {
        // Handle any errors that occur during the process
        console.error(err);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}