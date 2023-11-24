import Layout from "@/components/Layout/Layout";
import SignComponent from "@/components/Sign/SignComponent";

export default function Home(){
    return(
        <Layout navBar={false}>
            <SignComponent />
        </Layout>
    )
}