import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "./helpers/getUser";
import { redirect } from "next/navigation";

async function getData(){
  "use server;"
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

export async function deleteCookies(){
  "use server";
  cookies().delete("token");
}

export default async function Home() {

  let user = await getData();

  return (
      <Layout deleteCookies={deleteCookies} user={user}>
        <Hero user={user} />
      </Layout>
  )
}
