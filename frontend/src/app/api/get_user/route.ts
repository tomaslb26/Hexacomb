import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    try {
        // Parse incoming JSON from the request body
        const body = await req.json();

        // Check if the token is available in the request body
        if (!body.token) {
            // Handle the case where the token is missing
            return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
        }
        // Make a POST request to the demo API with the Bearer token
        const apiRes = await fetch(`${process.env.BACKEND_URL}api/v1/user/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${body.token}`  // Set the Authorization header with Bearer token
            },
            cache: "no-store"
        });

        // Parse the response from the API
        const dataReceived = await apiRes.json();
        const resA = NextResponse.json(dataReceived);
        return resA;
    
    } catch (err) {
        // Handle any errors that occur during the process
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}