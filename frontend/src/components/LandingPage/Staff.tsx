import styles from "@/styles/LandingPage/Staff.module.css"
import Image from "next/image"

export default function Staff(){
    return(
        <div className={styles['staff-container']}>
            <p>The Staff Team</p>
            <div className="divider" />
            <div className={styles['staff-wrapper']}>
                <p>The 5 Heads</p>
                <div className={styles['staff-heads']}>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/Chexse_.png"} alt="" width={60} height={60} />
                        <p>Chexse</p>
                    </div>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/Ferrno.png"} alt="" width={60} height={60} />
                        <p>Ferrno</p>
                    </div>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/NevQ.png"} alt="" width={60} height={60} />
                        <p>NevQ</p>
                    </div>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/Rich_U.png"} alt="" width={60} height={60} />
                        <p>Rich</p>
                    </div>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/Willmick1.png"} alt="" width={60} height={60} />
                        <p>Willmick</p>
                    </div>
                </div>
            </div>
            <div className="divider" />
            <div className={styles['staff-wrapper']}>
                <p>Admins</p>
                <div className={styles['staff-heads']}>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/Fabian.png"} alt="" width={60} height={60} />
                        <p>Fabian</p>
                    </div>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/Hardy.png"} alt="" width={60} height={60} />
                        <p>Hardy</p>
                    </div>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/MiniMichiii.jpg"} alt="" width={60} height={60} />
                        <p>MiniMichii</p>
                    </div>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/Titanicus.png"} alt="" width={60} height={60} />
                        <p>Titanicus</p>
                    </div>
                    <div className={styles['staff']}>
                        <Image src={"/images/LandingPage/Staff/Vallya.png"} alt="" width={60} height={60} />
                        <p>Vallya</p>
                    </div>
                </div>
                <div className="divider" />
            </div>
        </div>
    )
}