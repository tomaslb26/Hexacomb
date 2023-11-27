"use server;"

import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "./helpers/getUser";
import { redirect } from "next/navigation";
import deleteCookies from "./helpers/deleteCookies";

async function getData(){
  try{
    let token = undefined;
    if(cookies().get("token")){
      token = cookies().get("token")?.value;
    }


    let user = undefined;
    try{
      if(token){
        user = await getUser(token);
      }
    }catch(e){
      console.log(e);
      return undefined;
    }

    if(user && !user.verified){
      redirect("/2fa");
    }

    if(user === undefined){
      deleteCookies();
      return undefined;
    }
    return user;
  }catch(e){
    console.log(e);
    return undefined;
  }
}


export default async function Home() {


  let user = await getData();

  return (
      <Layout user={user}>
        <Hero user={user} />
      </Layout>
  )
}
