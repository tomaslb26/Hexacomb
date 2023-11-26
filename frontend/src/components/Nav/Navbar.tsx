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
import Recap from "../Recap/Recap";
import { RxCaretDown, RxCross2 } from "react-icons/rx";
import { LuFolderSearch2 } from "react-icons/lu";


export default function Navbar(props: {user?: User}) {

    const {user} = props;

    const router = useRouter();
    const [toggle, setToggle] = useState(false);
    const [mobileToggle, setMobileToggle] = useState(false);
    const pathname = usePathname();
    const Cookies = useContext(CookiesContext);

    function handleLogout() {
        Cookies.delete();
        router.refresh();
        setMobileToggle(false);
        setToggle(false);
    }

    return(
        <nav className={styles['navbar']}>
            <Image src="/images/HexaLogo.png" alt="Hexa Logo" width={50} height={50} />
            <div className={styles['nav-buttons']}>
                <Link className={`${pathname === "/" ? styles['selected'] : ""}`} href="/">Home <Home /> </Link>
                <div className={styles['dropdown']}>
                    <h2 className={`${pathname === "/about" || pathname === "/recap" ? styles['selected'] : ""}`} >Overview <RxCaretDown /></h2>
                    <div className={styles['content-wrapper']}>
                        <div className={styles['dropdown-content']}>
                            <Link className={`${styles['dropdown-item']} ${pathname === "/about" ? styles['selected-item'] : ""}`} href="/about">
                                <h6>About <About /></h6>
                                <p>A brief introduction on how Hexacomb works and who are the staff members</p>
                            </Link>
                            <Link className={`${styles['dropdown-item']} ${pathname === "/recap" ? styles['selected-item'] : ""}`} href="/recap">
                                <h6>Season Recap <BookClosed /> </h6>
                                <p>Take a look into Hexacomb&apos;s past and its evolution</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles['dropdown']}>
                    <h2 className={`${pathname.includes("stats") ? styles['selected'] : ""}`}>Stats <RxCaretDown /></h2>
                    <div className={styles['content-wrapper']}>
                        <div className={styles['dropdown-content']}>
                            <Link className={`${styles['dropdown-item']} ${pathname === "/stats/seasons" ? styles['selected-item'] : ""}`} href="/stats/seasons">
                                <h6>Season Stats <BarChart /> </h6>
                                <p>Explore the top players in specific categories choosen by you</p>
                            </Link>
                            <Link className={`${styles['dropdown-item']} ${pathname === "/stats/players" ? styles['selected-item'] : ""}`} href="/stats/players">
                                <h6>Player Stats <UserSquare /> </h6>
                                <p>Explore your stats and see how you compare with your friends</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <Link className={`${pathname === "/directory" ? styles['selected'] : ""}`} href="/directory">Directory <Folder /></Link>
            </div>

            <div className={styles['not-mobile']}>
                {!user ?
                <Link href={"/sign"}><button className="default-button">Get Started</button></Link>
                :
                <div className={styles['user-profile']}>
                    <Image onClick={() => setToggle((prev) => !prev)} src={user.avatarUrl} alt="User Avatar" width={48} height={48} />
                    {toggle &&
                    <div className={styles['user-dropdown']}>
                        <Link href={"/directory?new=true"}><button><FaPlus /> New Submission</button></Link>
                        <Link href={`/profile/submissions`}><button><LuFolderSearch2 /> Your Submissions</button></Link>
                        <button onClick={handleLogout} ><PiSignOutBold /> Logout</button>
                    </div>}
                </div>
                }
            </div>

            <div className={styles['mobile']}>
                {!user ?
                <div className={styles['user-profile']}>
                    <Image onClick={() => setMobileToggle((prev) => !prev)} src={"/images/Steve.png"} alt="User Avatar" width={48} height={48} />
                </div>
                :
                <div className={styles['user-profile']}>
                    <Image onClick={() => setMobileToggle((prev) => !prev)} src={user.avatarUrl} alt="User Avatar" width={48} height={48} />
                </div>
                }
                {mobileToggle &&
                <div style={{display: "flex"}} className="modal-wrapper">
                    <div className={styles['slide-modal']}>
                        <Image src="/images/HexaLogo.png" alt="Hexa Logo" width={50} height={50} />
                        <h1>Hexacomb</h1>
                        <div className={styles['slide-buttons']}>
                            <Link className={`${pathname === "/" ? styles['selected-slide'] : ""} ${styles['slide-button']}`} href="/"><Home /> Home</Link>
                            <Link className={`${pathname === "/about" ? styles['selected-slide'] : ""} ${styles['slide-button']}`} href="/about"><About /> About Us</Link>
                            <Link className={`${pathname === "/recap" ? styles['selected-slide'] : ""} ${styles['slide-button']}`} href="/recap"><BookClosed /> Season Recap</Link>
                            <Link className={`${pathname === "/stats/seasons" ? styles['selected-slide'] : ""} ${styles['slide-button']}`} href="/stats/seasons"><BarChart /> Season Stats</Link>
                            <Link className={`${pathname === "/stats/players" ? styles['selected-slide'] : ""} ${styles['slide-button']}`} href="/stats/players"><UserSquare />Player Stats</Link>
                            <Link className={`${pathname === "/directory" ? styles['selected-slide'] : ""} ${styles['slide-button']}`} href="/directory"><Folder /> Directory</Link>
                        </div>
                        <div className="divider" />
                        {user && <div className={styles['slide-buttons']}>
                            <Link className={`${pathname === "/profile/submissions" ? styles['selected-slide'] : ""} ${styles['slide-button']}`} href="/profile/submissions"><LuFolderSearch2 /> Your Submissions</Link>
                        </div>}
                        {user && <div className="divider" />}
                        {!user ?
                        <Link style={{width: "100%", marginTop: "auto"}}  href={"/sign"}><button style={{width: "100%"}}  className="default-button">Get Started</button></Link>
                        :
                        <button style={{width: "100%", marginTop: "auto"}} onClick={handleLogout} className="default-button">Logout</button>
                        }
                    </div>
                    <button onClick={() => setMobileToggle(false)} className={styles['close']}><RxCross2 /></button>
                </div>}
            </div>
        </nav>
    )


}