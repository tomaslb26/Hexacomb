import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "../helpers/getUser";
import Main from "@/components/AboutUs/Main";
import { redirect } from "next/navigation";
import deleteCookies from "../helpers/deleteCookies";

async function getData(){
  const token = cookies().get("token")?.value;
  let user = undefined;
  if(token){
    user = await getUser(token);
  }

  if(user && !user.verified){
    redirect("/2fa");
  }

  if(user === undefined){
    deleteCookies();
    return undefined;
  }
  return user;
}


export default async function Home() {

  const user = await getData();

  return (
    <Layout user={user}>
      <Main />
    </Layout>
  )
}
