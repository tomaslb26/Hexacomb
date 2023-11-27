import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "./helpers/getUser";
import { redirect } from "next/navigation";
import deleteCookies from "./helpers/deleteCookies";

async function getData(){
  "use server;"

  let token = undefined;
  if(cookies().get("token")){
    token = cookies().get("token")?.value;
  }


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


  let user = await getData();

  return (
      <Layout user={user}>
        <Hero user={user} />
      </Layout>
  )
}
