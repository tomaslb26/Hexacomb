"use client";

import styles from "@/styles/LandingPage/ImageCarousel.module.css"
import Image from "next/image"
import { useEffect, useState } from "react";

export default function ImageCarousel(){

    const [currentImage, setCurrentImage] = useState<number>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            if(currentImage === 4){
                setCurrentImage(1);
            }else{
                setCurrentImage((prev) => prev + 1);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImage]);

    return(
        <div className={styles['image-carousel']}>
            {[1, 2, 3, 4].map((index) => (
                <Image
                key={index}
                className={`${styles.image} ${
                    index === currentImage ? styles.visible : styles.hidden
                }`}
                width={1920}
                height={1080}
                src={`/images/LandingPage/${currentImage}.png`}
                alt={`Image ${index}`}
                />
            ))}
        </div>
    )
}