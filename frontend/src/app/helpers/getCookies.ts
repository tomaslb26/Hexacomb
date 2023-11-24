import Cookies from "js-cookie";

export default async function getCookies(token : string) {
    console.log("SHOUTING");
    const res = await fetch("http://localhost:3000/api/demo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token})
      });

    const dataReceived = await res.json() as {message?: string, error?: string, token?: string};

    console.log(dataReceived);
}