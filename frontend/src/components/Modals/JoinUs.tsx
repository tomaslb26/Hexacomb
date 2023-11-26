import { ForwardedRef, forwardRef } from "react"
import styles from "@/styles/Modals/JoinUs.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const JoinUs = forwardRef<HTMLDivElement, {
    setDisable?: React.Dispatch<React.SetStateAction<boolean>>
}
>((props, ref: ForwardedRef<HTMLDivElement>) => {


    const { setDisable } = props;

    const handleClose = () => {
        if (typeof ref === 'function') {
            ref(null); // Handle the callback ref function case
          } else if (ref && ref.current && setDisable) {
              setDisable(false);
              ref.current.style.display = 'none'; // Access the current property of the mutable ref object
          }
    }

    return(
        <div ref={ref} className="modal-wrapper">
            <div className={styles['modal']}>
                <Image src="/images/BazingaBed.png" alt="Hexa Logo" width={1000} height={1000} quality={100} />
                <div className={styles['modal-content']}>
                    <h1>Haven&apos;t joined us yet?</h1>
                    <h2>What are you waiting for? Click the button below and join a group of friends that cares more about the journey than the destination.</h2>
                </div>
                <Link href="https://discord.com/invite/yj9vmgSrse">
                    <button className="default-button bigger"><FaDiscord /> Join Us</button>
                </Link>
                <button onClick={handleClose} className={styles['close']}><RxCross2 /></button>
            </div>
        </div>
    )
})


JoinUs.displayName = "JoinUs";
export default JoinUs;