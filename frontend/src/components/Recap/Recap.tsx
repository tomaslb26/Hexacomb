"use client";

import styles from "@/styles/AboutUs/Main.module.css";
import Staff from "../LandingPage/Staff";
import { useEffect, useState } from "react";
import Image from "next/image";
import usePreloadS1Images from "@/utils/usePreloadS1Images";
import Link from "next/link";
import { HiOutlineDocumentDownload } from "react-icons/hi";


export default function Recap(){

    const [currentS1Image, setCurrentS1Image] = useState<number>(1);
    const [currentS2Image, setCurrentS2Image] = useState<number>(1);
    const [currentS3Image, setCurrentS3Image] = useState<number>(1);

    usePreloadS1Images();

    useEffect(() => {
        const interval = setInterval(() => {
            if(currentS1Image === 9){
                setCurrentS1Image(1);
            }else{
                setCurrentS1Image((prev) => prev + 1);
            }


            if(currentS2Image === 18){
                setCurrentS2Image(1);
            }else{
                setCurrentS2Image((prev) => prev + 1);
            }

            if(currentS3Image === 16){
                setCurrentS3Image(1);
            }
            else{
                setCurrentS3Image((prev) => prev + 1);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [currentS1Image, currentS2Image, currentS3Image]);



    return(
        <div className={styles['main-wrapper']}>
            <div className={styles['main-heading']}>
                <h2>Season 1</h2>
                <h1>The Great City of Egghole.</h1>
                <p>The Hexacomb was first talked about in a mountainside town, a settlement of travelers from lands far and wide all mixing ideas and ideals, eventually forming a democratic system of government that would be abused by the people immensely. Nevertheless, through the power of economic systems and lots of murder, they continued to worship the Hexacomb, their life- bringer, and their seeker of worlds safer than their own.</p>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <Image
                key={index}
                className={`${styles.image} ${
                    index === currentS1Image ? styles.visible : styles.hidden
                }`}
                width={600}
                height={300}
                src={`/images/Season 1/${index}.jpg`}
                alt={`Image ${index}`}
                quality={100}
                priority
                />
                ))}
                <Link href={"https://drive.google.com/file/d/1CsKZUpFpR2oJTtZRnjnu2EiFhwLO2x5Z/edit"}>
                    World Download <HiOutlineDocumentDownload />
                </Link>
            </div>
            <div className={styles['main-heading']}>
                <h2>Season 2</h2>
                <h1>Divided into Nations.</h1>
                <p>It was shortly after the formation of the final coalition government of the city of Egghole that the Hexacomb appeared and transported all the citizens of the city, sans one Block Astley, who disappeared from the city shortly thereafter to embark to kingdoms abandoned for riches abound, to an undeveloped land far away, mystical and medieval in nature. The citizens had two main goals in this world: first to conquer the surrounding landscapes and connected realms, and secondly to get home to their home, finally at peace, their Egghole.</p>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((index) => (
                <Image
                key={index}
                className={`${styles.image} ${
                    index === currentS2Image ? styles.visible : styles.hidden
                }`}
                width={600}
                height={300}
                src={`/images/Season 2/${index}.png`}
                alt={`Image ${index}`}
                quality={100}
                priority
                />
                ))}
                <embed style={{borderRadius: "12px"}} className={styles['map']} src="https://www.youtube.com/embed/gBkEmbOb9BE?si=C9gjLRBmVkjaahR-" />
                <Link href={"https://drive.google.com/file/d/1AG-1qYXxDQ5eg7HeCE82byDo0AeZPQLs/edit"}>
                    World Download <HiOutlineDocumentDownload />
                </Link>
            </div>
            <div className={styles['main-heading']}>
                <h2>Season 3</h2>
                <h1>The Season of Good Neighbors.</h1>
                <p>
                In the Season of Good Neighbors, players united around the tale of the Hexacomb. A democratic system formed amid pixelated villages, facing occasional strains. Fueled by economic dynamics and occasional conflicts, the community remained devoted to the Hexacomb—a mysterious entity serving as both life-bringer and seeker of safer worlds. Through ups and downs, the season showcased the resilience of a community bound by shared adventures and reverence for the enigmatic Hexacomb.</p>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
                <Image
                key={index}
                className={`${styles.image} ${
                    index === currentS3Image ? styles.visible : styles.hidden
                }`}
                width={600}
                height={300}
                src={`/images/Season 3/${index}.png`}
                alt={`Image ${index}`}
                quality={100}
                priority
                />
                ))}
                <Link href={"https://drive.google.com/file/d/1oK-qxy0NHut4QaMKIRhhvLaY8ydHaLWD/edit"}>
                    World Download <HiOutlineDocumentDownload />
                </Link>
            </div>
        </div>
    )
}