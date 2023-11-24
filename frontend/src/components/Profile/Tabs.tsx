import Link from "next/link";

export default function Tabs(){
    return(
        <div className="w-full gap-8 flex justify-start">
            <Link className="bg-primary-yellow px-6 py-3 rounded-lg text-white font-medium" href="/profile/submissions">
                Submissions
            </Link>
        </div>
    )
}