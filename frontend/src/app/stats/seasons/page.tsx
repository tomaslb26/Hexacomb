import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "../../helpers/getUser";
import Main from "@/components/AboutUs/Main";
import Recap from "@/components/Recap/Recap";
import SeasonStats from "@/components/Stats/Season/SeasonStats";

async function getData(){
  const token = cookies().get("token")?.value;
  let user = undefined;
  if(token){
    user = await getUser(token);
  }
  return user;
}

export default async function Home() {

  const user = await getData();

  return (
    <Layout user={user}>
        <SeasonStats />
    </Layout>
  )
}
