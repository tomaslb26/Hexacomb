import { cookies } from "next/headers";

export default async function deleteCookies(){
    "use server";
    cookies().delete("token");
}