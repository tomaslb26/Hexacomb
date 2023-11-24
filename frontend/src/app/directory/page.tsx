import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "../helpers/getUser";
import { redirect } from "next/navigation";
import { deleteCookies } from "../page";
import CreateSubmission from "@/components/Modals/CreateSubmission";
import MainDirectory from "@/components/Directory/MainDirectory";
import getSubmissions from "../helpers/getSubmissions";
import { Submission } from "@/types/submission";
import { User } from "@/types/user";
import { createContext } from "react";

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

  const subResponse = await getSubmissions();
  const submissions = subResponse?.submissions;

  return {
    user: user,
    submissions: submissions
  }
}

export default async function Home() {

  const data : Props = await getData();

  return (
      <Layout deleteCookies={deleteCookies} user={data.user}>
        <MainDirectory submissions={data.submissions} user={data.user} />
      </Layout>
  )
}
