"use client"

import getCookies from "@/app/helpers/getCookies"

export default function DemoComponent(props: {token: string}){

    console.log(props.token);
    getCookies(props.token);

    return(
        <>
        </>
    )

}