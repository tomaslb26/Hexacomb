import fetchPonyfill from "fetch-ponyfill";
import { cookies } from "next/headers";

export default async function deleteCookies(){
    await fetchPonyfill().fetch(process.env.LOCAL_URL + "/api/logout", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
      });
}