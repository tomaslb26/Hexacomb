"use client";

import styles from "@/styles/Navbar/Nav.module.css"
import Image from "next/image"
import Link from "next/link"
import Home from "../SVG/Home"
import About from "../SVG/About"
import BookClosed from "../SVG/BookClosed"
import BarChart from "../SVG/BarChart"
import UserSquare from "../SVG/UserSquare"
import {useRouter, usePathname} from "next/navigation"
import { User } from "@/types/user";
import { useContext, useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { CookiesContext } from "../Layout/Layout";
import Folder from "../SVG/Folder";

export default function Navbar(props: {user?: User}) {

    const {user} = props;

    const router = useRouter();
    const [toggle, setToggle] = useState(false);
    const pathname = usePathname();
    const Cookies = useContext(CookiesContext);

    function handleLogout() {
        Cookies.delete();
        router.push("/");
    }

    return(
        <nav className={styles['navbar']}>
            <Image src="/images/HexaLogo.png" alt="Hexa Logo" width={50} height={50} />
            <div className={styles['nav-buttons']}>
                <Link className={`${pathname === "/" ? styles['selected'] : ""}`} href="/"><Home /> Home</Link>
                <Link className={`${pathname === "/about" ? styles['selected'] : ""}`} href="/about"><About /> About</Link>
                <Link className={`${pathname === "/recap" ? styles['selected'] : ""}`} href="/recap"><BookClosed /> Season Recap</Link>
                <Link className={`${pathname === "/stats/seasons" ? styles['selected'] : ""}`} href="/stats/seasons"><BarChart /> Season Stats</Link>
                <Link className={`${pathname === "/stats/players" ? styles['selected'] : ""}`} href="/stats/players"><UserSquare /> Player Stats</Link>
                <Link className={`${pathname === "/directory" ? styles['selected'] : ""}`} href="/directory"><Folder /> Directory</Link>
            </div>

            {!user ?
            <Link href={"/sign"}><button className="default-button">Get Started</button></Link>
            :
            <div className={styles['user-profile']}>
                <Image onClick={() => setToggle((prev) => !prev)} src={user.avatarUrl} alt="User Avatar" width={48} height={48} />
                {toggle &&
                <div className={styles['user-dropdown']}>
                    <button><FaPlus /> New Submission</button>
                    <button onClick={handleLogout} ><PiSignOutBold /> Logout</button>
                </div>}
            </div>
            }
        </nav>
    )


}