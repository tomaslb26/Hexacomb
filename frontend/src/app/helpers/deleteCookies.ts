import { cookies } from "next/headers";

export default async function deleteCookies(){
    await fetch("/api/logout", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
      });
}