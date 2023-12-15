import { ChangeEvent, ForwardedRef, forwardRef, useState } from "react";
import styles from "@/styles/Modals/WhitelistSubmission.module.css";
import Link from "next/link";
import { Controller, FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import Dropdown from "../Reusable/Dropdown";
import { error } from "console";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { uploadPhoto } from "@/utils/uploadPhoto";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";


interface Submission extends FieldValues {
    discordName: string;
    howDidYouFindUs: string;
    region: "EU" | "NA" | "SA" | "AU" | "ASIA" | "AFRICA" | "OTHER";
    englishProefficiency: boolean;
    age: string;
    aboutYourself: string;
    experienceInMinecraft: string;
    mcName: string;
    whatDoYouLookFor: string;
    howWouldYouContribute: string;
    waysToDriveLifespan: string;
    contributeToEconomy: string;
    howToHandleConflict: string;
    photos: string[]; // Assuming photos is an array of strings, update accordingly
    haveYouBeenBanned: string;
    describeOutfite: string;
}

const CreateSubmission = forwardRef<HTMLDivElement, {
    setDisable: React.Dispatch<React.SetStateAction<boolean>>,
}
>
((props, ref: ForwardedRef<HTMLDivElement>) => {

    const [photos, setPhotos] = useState<(File | string)[]>([]); // Assuming photos is an array of strings, update accordingly
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [error, setError] = useState("");

    const {setDisable} = props;

    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Submission>();

    const onSubmit: SubmitHandler<Submission> = async (data) => {
        const images: string[] = [];

        for(let i = 0; i < photos.length; i++){
            if(typeof photos[i] === "string"){
                images.push(photos[i] as string);
                continue;
            }
            const url = await uploadPhoto(photos[i] as File);
            images.push(url);
        }

        setPhotos(images);

        const submission: Submission = {
            ...data,
            images
        };

        setIsSaving(true);

        (async() => {
            const res = await fetch(process.env.LOCAL_URL + "/api/create_whitelist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submission)
            });

            const dataReceived = await res.json() as {success?: boolean, message: string, id: string};

            if(!dataReceived.success){

                setIsSaving(false);
                setError(dataReceived.message);
            }
            else {
                setIsSaving(false);
                setIsSaved(true);
            }
        })();
    }

    function handleClose(){
        if (typeof ref === 'function') {
            ref(null); // Handle the callback ref function case
        } else if (ref && ref.current) {
            setDisable(false);
            ref.current.style.display = 'none';
        }
    }

    function checkIfPicture(file: File) {
        return file.type === "image/png" || file.type === "image/jpeg";
    }

    return(
        <div ref={ref} className="modal-wrapper">
            <div className={styles['modal-container']}>
                {!isSaved ?
                <>
                    <div className={styles['modal-header']}>
                        <h1>Hexacomb Community Whitelist Application</h1>
                        <p>
                        Welcome to the Hexacomb Whitelist Application.
                        </p>
                        <p>
                        Before we get started, please ensure that you have joined our Discord.
                        </p>
                        <p>
                        The following link should take you there: <Link href={"https://discord.gg/eyf7T37xck"}>Discord Link</Link>
                        </p>
                        <p>
                        Done that? Great!
                        </p>
                        <p>
                        Now grab some popcorn and read through the whitelist guide (#1-whitelist-guide) and the FAQ (#3-whitelist-faq). Please make sure that you fully understand how our whitelist process works before proceeding. 
                        </p>    
                        <p>
                        If you have any questions about the application or the whitelist process here, please do not be afraid to ask in the whitelist chat in Discord (#2-whitelist-chat).
                        </p>
                        <p>
                        Notes:
                        <br />
                        Upon submitting your applications, you will not be able to edit it later on.
                        <br />
                        Please do not tag Hexacomb Staff or Interview Team about the status of your application, unless it has been over 72 hours.
                        </p>
                        <p>
                        Good luck & Thanks for your interest in Hexacomb SMP!
                        </p>
                    </div>
                    <form className={styles['modal-form']} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles['input-row']}>
                            <label htmlFor="discord-name">Discord Name</label>
                            <input {...register("discordName", {required: true, maxLength: 2500})} maxLength={64} aria-invalid={errors.discordName ? "true" : "false"} id="discord-name" />
                            {errors.discordName?.type === "required" && (
                                <p role="alert">Discord Name is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="how-did-you-find-us">How did you find about Hexacomb SMP?</label>
                            <textarea {...register("howDidYouFindUs", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.howDidYouFindUs ? "true" : "false"} id="how-did-you-find-us" />
                            {errors.howDidYouFindUs?.type === "required" && (
                                <p role="alert">&apos;How did you find us&apos; is required</p>
                            )}
                        </div>
                        <Controller
                        name="region"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                        <div className={styles['input-row']}>
                            <label htmlFor="region">Region</label>
                            <Dropdown options={["EU", "NA", "SA", "AU", "ASIA", "AFRICA", "OTHER"]} selected={value ? value : "Select a region"} setSelected={(value: string) => {
                                onChange(value);
                            }} isBlock={false} input={false} />
                            {errors.region?.type === "required" && (
                                <p role="alert">Region is required</p>
                            )}
                        </div>)
                        } />
                        <Controller
                        name="englishProefficiency"
                        control={control}
                        rules={{validate: (value, formValues) => value === true}}
                        render={({ field: { onChange, value } }) => (
                        <div className={styles['input-row']}>
                            <label htmlFor="english-proefficiency">Can you understand and use English effectively?</label>
                            <Dropdown options={["Yes", "No"]} selected={value === true ? "Yes" : "No"} setSelected={(value: string) => {
                                if(value === "Yes") {
                                    onChange(true);
                                }
                                else {
                                    onChange(false);
                                }
                            }} isBlock={false} input={false} />
                            {errors.englishProefficiency?.type === "validate" && (
                                <p role="alert">English Proefficiency is required.</p>
                            )}
                        </div>
                        )
                        } />
                        <div className={styles['input-row']}>
                            <label htmlFor="age">Age</label>
                            <input {...register("age", {required: true, maxLength: 2500})} maxLength={3} aria-invalid={errors.age ? "true" : "false"} id="age" />
                            {errors.age?.type === "required" && (
                                <p role="alert">Age is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="about-yourself">Tell us about yourself *We would appreciate it if you can go into as much detail as possible with as much as you are willing to share- hobbies, interests, pets, etc!*</label>
                            <textarea {...register("aboutYourself", {required: false, maxLength: 2500})} maxLength={2500} aria-invalid={errors.aboutYourself ? "true" : "false"} id="about-yourself" />
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="experience-in-minecraft">What Experience do you have playing Minecraft?</label>
                            <textarea {...register("experienceInMinecraft", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.experienceInMinecraft ? "true" : "false"} id="experience-in-minecraft" />
                            {errors.experienceInMinecraft?.type === "required" && (
                                <p role="alert">Experience In Minecraft is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="mc-name">Minecraft In Game Name</label>
                            <input {...register("mcName", {required: true, maxLength: 2500})} maxLength={64} aria-invalid={errors.mcName ? "true" : "false"} id="mc-name" />
                            {errors.mcName?.type === "required" && (
                                <p role="alert">Minecraft Name is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="what-do-you-look-for">What do you look for in a Minecraft Community & Server?</label>
                            <textarea {...register("whatDoYouLookFor", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.whatDoYouLookFor ? "true" : "false"} id="what-do-you-look-for" />
                            {errors.whatDoYouLookFor?.type === "required" && (
                                <p role="alert">What Do You Look For is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="how-would-you-contribute">In what ways are you looking to contribute to our Minecraft Community?</label>
                            <textarea {...register("howWouldYouContribute", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.howWouldYouContribute ? "true" : "false"} id="how-would-you-contribute" />
                            {errors.howWouldYouContribute?.type === "required" && (
                                <p role="alert">How Would You Contribute is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="ways-to-drive-lifespan">Story & &quot;Player to Player&quot; interaction is what pushes a SMP forward. In what ways do you think you can drive the lifespan of the server further based on the way you intend on contributing to the community?</label>
                            <textarea {...register("waysToDriveLifespan", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.waysToDriveLifespan ? "true" : "false"} id="ways-to-drive-lifespan" />
                            {errors.waysToDriveLifespan?.type === "required" && (
                                <p role="alert">Ways To Drive Lifespan is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="contribute-to-economy">In an economy-based server, how would you contribute to the in-game economy and trade with other players?</label>
                            <textarea {...register("contributeToEconomy", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.contributeToEconomy ? "true" : "false"} id="contribute-to-economy" />
                            {errors.contributeToEconomy?.type === "required" && (
                                <p role="alert">Contribute To Economy is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="how-to-handle-conflict">How do you go about handling conflict on a server? This includes drama outside the server or rule breaks by other players such as unsolicited PvP & Grief.</label>
                            <textarea {...register("howToHandleConflict", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.howToHandleConflict ? "true" : "false"} id="how-to-handle-conflict" />
                            {errors.howToHandleConflict?.type === "required" && (
                                <p role="alert">How To Handle Conflict is required</p>
                            )}
                        </div>
                        <div style={{
                            gap: "1rem",
                        }} className={styles['input-row']}>
                            <label>Please show any photo of high quality/effort builds Here.</label>
                            <label>Note: building skill is not required to play here as there are many ways to contribute to a fun and engaging environment on minecraft.</label>
                            {photos.length < 3 && <label className={styles['upload-photo']} htmlFor="photos"><FiUpload /> Upload Photo</label>}
                            <input style={{display: "none"}} type="file" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                if(event.target.files && photos.length < 3 && checkIfPicture(event.target.files[0])) {
                                    setPhotos([...photos, event.target.files[0]]);
                                }
                            }} id="photos" />
                            <div className={styles['photos-container']}>
                                {photos.map((photo, index) => {
                                    return(
                                        <div key={index} className={styles['photo-container']}>
                                            <Image width={500} height={500} src={typeof photo === "string" ? photo : URL.createObjectURL(photo)} alt="Photo" />
                                            <button type="button" onClick={() => {
                                                setPhotos(photos.filter((_, i) => i !== index));
                                            }}><RxCross2 /  ></button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="have-you-been-banned">Have you ever been banned from any Minecraft Servers in the past? If so, why?</label>
                            <textarea {...register("haveYouBeenBanned", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.haveYouBeenBanned ? "true" : "false"} id="have-you-been-banned" />
                            {errors.haveYouBeenBanned?.type === "required" && (
                                <p role="alert">Have You Been Banned is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="describe-outfite">Imagine you&apos;re hosting a &quot;Minecraft Fashion Show&quot; on the server, and the theme is &quot;Mobs in Formal Wear.&quot; You have to dress up one of the hostile mobs in the most hilarious and stylish formal outfit you can think of. Describe the outfit in detail and explain why you think it would win the fashion show.</label>
                            <textarea {...register("describeOutfite", {required: true, maxLength: 2500})} maxLength={2500} aria-invalid={errors.describeOutfite ? "true" : "false"} id="describe-outfite" />
                            {errors.describeOutfite?.type === "required" && (
                                <p role="alert">Describe Outfite is required</p>
                            )}
                        </div>
                        {error !== "" && <div className={styles['input-row']}>
                            <p>{error}</p>
                        </div>}
                        <button className="default-button">{
                            isSaving ? 
                            <>
                                <div className={styles['spinner']}></div>
                                Saving
                            </> : "Submit"
                        }</button>
                    </form>
                </>
                :
                <div className={styles['modal-saved']}>
                <div className={styles['header']}>
                    <FaRegCircleCheck />
                    <h1>Your whitelist request was sent! Wait while our admins review your application.</h1>
                </div>
                    <Image width={500} height={500} src="/images/BazingaToilet.png" alt="Whitelist Submission" />
                </div>
                }
            <button className={styles['close-button']} onClick={handleClose}><RxCross2 /></button>
            </div>
        </div>
    )

})

CreateSubmission.displayName = "CreateSubmission";
export default CreateSubmission;
