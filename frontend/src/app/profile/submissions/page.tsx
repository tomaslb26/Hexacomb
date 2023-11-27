import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "../../helpers/getUser";
import { redirect } from "next/navigation";
import CreateSubmission from "@/components/Modals/CreateSubmission";
import MainDirectory from "@/components/Directory/MainDirectory";
import { Submission } from "@/types/submission";
import { User } from "@/types/user";
import { createContext } from "react";
import getSubmissionsByUser from "@/app/helpers/getSubmissionsByUser";
import ProfileSubmissions from "@/components/Profile/ProfileSubmissions";
import Tabs from "@/components/Profile/Tabs";

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

  let submissions = undefined;

  if(user){
    const subResponse = await getSubmissionsByUser(user.username);
    submissions = subResponse?.submissions;
  }

  return {
    user: user,
    submissions: submissions
  }
}

async function deleteCookies(){
  "use server";
  cookies().delete("token");
}

export default async function Home() {

  const data : Props = await getData();

  return (
      <Layout deleteCookies={deleteCookies} user={data.user}>
        <Tabs />
        <ProfileSubmissions user={data.user} submissions={data.submissions} />
      </Layout>
  )
}
