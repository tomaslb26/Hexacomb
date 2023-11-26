import Layout from "@/components/Layout/Layout";
import ForgotComponent from "@/components/Login/ForgotComponent";
import LoginComponent from "@/components/Login/LoginComponent";
import SignComponent from "@/components/Sign/SignComponent";
import React from "react";

export default function Home({
    params,
    searchParams,
  }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}){

    return(
        <Layout navBar={false}>
            <ForgotComponent username={searchParams['username'] as string} />
        </Layout>
    )
}