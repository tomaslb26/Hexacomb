import type { NextApiRequest, NextApiResponse } from 'next'
import { parse, serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import {cookies} from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {


    const token = cookies().get("token")?.value;
    const body = await req.json();
    try {
        const apiRes = await fetch(`${process.env.BACKEND_URL}api/v1/submission/delete/${body.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
            }
        });
        const dataReceived = await apiRes.json() as {message: string, id: string, success: boolean};

        if(!dataReceived.success){
            const resA = NextResponse.json(dataReceived);
            return resA
        }
        else{
            const resA = NextResponse.json(dataReceived);
            return resA
        }
    }
    catch (err) {
        return NextResponse.json(err);
    }
}
