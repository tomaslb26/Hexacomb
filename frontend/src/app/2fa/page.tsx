import DemoComponent from '@/components/DemoComponent';
import getCookies from '../helpers/getCookies';
import styles from './../page.module.css'
import {cookies} from "next/headers";
import getUser from '../helpers/getUser';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';
import CodeInsertPanel from '@/components/2FA/CodeInsertPanel';
import Layout from '@/components/Layout/Layout';

async function getData(){
  const token = cookies().get("token")?.value;
  let user : User | null = null;
  if(token){
    user = await getUser(token);
  }

  if(!user){
    redirect("/");
  }
  else if(
    user.isVerified
  ){
    redirect("/");
  }


  return user;
}

export default async function Home() {

  const user = await getData();

  return (
    <Layout navBar={false}>
      <CodeInsertPanel user={user}/>
    </Layout>
  )
}
