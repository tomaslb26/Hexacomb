import { NextRequest, NextResponse } from 'next/server';
import {cookies} from "next/headers";

export async function DELETE(req: NextRequest, res: NextResponse) {
  cookies().delete("token");

  return NextResponse.json({message: "Logged out successfully", success: true});
}
