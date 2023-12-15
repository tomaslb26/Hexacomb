"use client";

import styles from "@/styles/LandingPage/Hero.module.css"
import Image from "next/image"
import ExternalLink from "../SVG/ExternalLink"
import useGetOnlinePlayers from "@/app/helpers/useGetOnlinePlayers"
import { useEffect, useRef, useState } from "react";
import GamingIcon from "../SVG/GamingIcon";
import {FaDiscord} from "react-icons/fa";
import UsersPlus from "../SVG/UsersPlus";
import Calendar from "../SVG/Calendar";
import Star from "../SVG/Star";
import ImageCarousel from "./ImageCarousel";
import Staff from "./Staff";
import Link from "next/link";
import JoinUs from "../Modals/JoinUs";
import { User } from "@/types/user";
import useDisableScrollbar from "@/utils/useDisableScrollbar";
import WhitelistSubmission from "../Modals/WhitelistSubmission";
import { FiSend } from "react-icons/fi";

export default function Hero(props: {
    user?: User
}) {

    const [players, setPlayers] = useState<number | undefined>(undefined);
    useGetOnlinePlayers(setPlayers);

    const [disableScrollbar, setDisableScrollbar] = useState<boolean>(false);
    useDisableScrollbar(disableScrollbar);

    const modalRef = useRef<HTMLDivElement>(null);
    const whitelistRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(props.user === undefined && modalRef.current){
            modalRef.current.style.display = "flex";
            setDisableScrollbar(true);
        }
    }, [props.user])


    return(
        <div className={styles['hero']}>
            <WhitelistSubmission setDisable={setDisableScrollbar} ref={whitelistRef} />
            <JoinUs setDisable={setDisableScrollbar} ref={modalRef} />
            <div className={styles['hero-wrapper']}>
                <div className={styles['main-section']}>
                    <div className={styles['heading-container']}>
                        <Image src="/images/honey_block.png" alt="" width={200} height={200} />
                        <h1>Hexacomb</h1>
                    </div>
                    <p>Embark on a blocky odyssey within our thriving Minecraft community, where creativity knows no bounds, and every pixel tells a story of endless exploration and collaboration!</p>
                    <div className={styles['buttons-container']}>
                        <Link href="https://discord.com/invite/yj9vmgSrse">
                            <button className="default-button bigger"><FaDiscord /> Join Us</button>
                        </Link>
                        {!props.user && <button className="default-button bigger" onClick={() => {
                            if(whitelistRef.current){
                                whitelistRef.current.style.display = "flex";
                                setDisableScrollbar(true);
                            }
                        }}><FiSend /> Apply</button>}
                    </div>               
                </div>
                <div className={styles['check-section']}>
                    {players !== undefined && 
                    <div className={styles['check-container']}>
                        <GamingIcon />
                        <p>{`Currently ${players} players online.`}</p>
                    </div>}
                    <div className={styles['check-container']}>
                        <UsersPlus />
                        <p>More than 300 players joined since the start.</p>
                    </div>
                    <div className={styles['check-container']}>
                        <Calendar />
                        <p>Currently in the fourth game season.</p>
                    </div>
                    <div className={styles['check-container']}>
                        <Star />
                        <p>Thriving for more than 2 years.</p>
                    </div>
                </div>
            </div>
            <ImageCarousel />
            {/*<Staff />*/}
        </div>
    )

}