import Hero from "@/components/LandingPage/Hero";
import Layout from "@/components/Layout/Layout";
import { cookies } from "next/headers";
import getUser from "../helpers/getUser";
import { redirect } from "next/navigation";
import CreateSubmission from "@/components/Modals/CreateSubmission";
import MainDirectory from "@/components/Directory/MainDirectory";
import getSubmissions from "../helpers/getSubmissions";
import { Submission } from "@/types/submission";
import { User } from "@/types/user";
import { createContext } from "react";
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

  const subResponse = await getSubmissions();
  const submissions = subResponse?.submissions;

  return {
    user: user,
    submissions: submissions?.filter(submission => submission.status === "ACCEPTED")
  }
}

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const data : Props = await getData();

  return (
      <Layout user={data.user}>
        <MainDirectory isNew={searchParams['new'] ? true : false} submissions={data.submissions ? data.submissions : []} user={data.user} />
      </Layout>
  )
}
