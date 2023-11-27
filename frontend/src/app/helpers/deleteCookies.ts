import { cookies } from "next/headers";

export default async function deleteCookies(){
    await fetch("http://localhost:3000/api/logout", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
      });
}