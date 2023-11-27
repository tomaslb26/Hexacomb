import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "../helpers/getUser";
import { redirect } from "next/navigation";
import CreateSubmission from "@/components/Modals/CreateSubmission";
import MainDirectory from "@/components/Directory/MainDirectory";
import { Submission } from "@/types/submission";
import { User } from "@/types/user";
import { createContext } from "react";
import getSubmissionsByUser from "@/app/helpers/getSubmissionsByUser";
import ProfileSubmissions from "@/components/Profile/ProfileSubmissions";
import Tabs from "@/components/Profile/Tabs";
import getSubmissions from "@/app/helpers/getSubmissions";
import Admin from "@/components/AdminPanel/Admin";
import deleteCookies from "../helpers/deleteCookies";

interface Props {
  user : User | undefined,
  submissions?: Submission[]
}

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
  }

  if(!user){
    redirect("/");
  }

  if(user && user.role !== "ADMIN"){
    redirect("/");
  }

  let submissions = undefined;

  if(user){
    const subResponse = await getSubmissions();
    submissions = subResponse?.submissions;
  }

  return {
    user: user,
    submissions: submissions
  }
}

export default async function Home() {

  const data : Props = await getData();

  return (
      <Layout user={data.user}>
        <Admin user={data.user} submissions={data.submissions} />
      </Layout>
  )
}
