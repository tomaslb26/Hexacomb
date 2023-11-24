import Layout from "@/components/Layout/Layout";
import LoginComponent from "@/components/Login/LoginComponent";
import SignComponent from "@/components/Sign/SignComponent";
import React from "react";

export default function Home(){
    return(
        <Layout navBar={false}>
            <LoginComponent />
        </Layout>
    )
}