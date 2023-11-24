import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    try {
        // Parse incoming JSON from the request body
        const body = await req.json();

        const token = cookies().get("token")?.value;
        // Make a POST request to the demo API with the Bearer token
        const apiRes = await fetch(`${process.env.BACKEND_URL}api/v1/user/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // Set the Authorization header with Bearer token
            },
            body: JSON.stringify({
                username: body.username,
                code: body.code
            })
        });

        // Parse the response from the API
        const dataReceived = await apiRes.json();
        const resA = NextResponse.json(dataReceived);
        return resA;
    
    } catch (err) {
        // Handle any errors that occur during the process
        console.error(err);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}