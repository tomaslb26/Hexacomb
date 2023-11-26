"use client";
import styles from "@/styles/Modals/CreateSubmission.module.css"
import { ChangeEvent, ForwardedRef, Reducer, forwardRef, useEffect, useRef, useState } from "react";
import useDisableScrollbar from "@/utils/useDisableScrollbar";
import {useReducer} from "react";
import { ItemSale, Submission, SubmissionActions, SubmissionReducer } from "@/types/submission";
import { mcObjects } from "@/types/minecraftObjects";
import Dropdown from "../Reusable/Dropdown";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { uploadPhoto } from "@/utils/uploadPhoto";
import { usePathname } from "next/navigation";

const CreateSubmission = forwardRef<HTMLDivElement, {
    submission?: Submission,
    setDisable: React.Dispatch<React.SetStateAction<boolean>>,
}
>
((props, ref: ForwardedRef<HTMLDivElement>) => {

    const { setDisable } = props;
    
    const {
        register,
        setValue,
        handleSubmit,
        getFieldState,
        control,
        getValues,
        reset,
        formState: { errors },
      } = useForm<Submission>({
      });
    const [selectedItem, setSelectedItem] = useState<ItemSale>({
        item: mcObjects[0],
        price: ""
    });
    const [uploaded, setUploaded] = useState<(string | File)[]>([]);
    const [error, setError] = useState<string>("");
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const pathname = usePathname();

    useEffect(() => {
        if(props.submission){
            reset(props.submission);
            setUploaded(props.submission.images.map((image) => {
                return image;
            }));
        }
        else{
            reset({
                title: "",
                description: "",
                type: "SHOP",
                items: [],
                mcName: "",
                x: "",
                y: "",
                z: "",
                images: []
            
            });
            setUploaded([]);
        }
    }, [props.submission, reset])

    const onSubmit = handleSubmit(async (data) => {
        if(uploaded.length === 0){
            setError("You must upload at least one image.");
            return;
        }

        setIsSaving(true);

        const images: string[] = [];

        for(let i = 0; i < uploaded.length; i++){
            if(typeof uploaded[i] === "string"){
                images.push(uploaded[i] as string);
                continue;
            }
            const url = await uploadPhoto(uploaded[i] as File);
            images.push(url);
        }

        const submission: Submission = {
            ...data,
            images
        };

        (async() => {
            const res = await fetch(props.submission ? `/api/update_submission` : "/api/create_submission", {
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
                pathname === "/directory" ? window.location.href = "/directory" : window.location.reload();
            }
        })();
    })

    function handleClose(){
        if (typeof ref === 'function') {
            ref(null); // Handle the callback ref function case
        } else if (ref && ref.current) {
            setDisable(false);
            ref.current.style.display = 'none'; // Access the current property of the mutable ref object
            reset({
                title: "",
                description: "",
                type: "SHOP",
                items: [],
                mcName: "",
                x: "",
                y: "",
                z: "",
                images: []
            
            });
            setUploaded([]);
        }
    }

    return(
        <div ref={ref} className="modal-wrapper">
            <div className={styles['modal-container']}>
                <div className={styles['modal-header']}>
                    <h1>{props.submission ? "Edit" : "Create"} a Submission</h1>
                    <p>Fill out the form to submit your shop or point of interest in Hexacomb.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles['modal-body']}>
                    <div className={styles['input-tabs']}>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <button onClick={() => onChange("SHOP")} type="button" className={value === "SHOP" ? styles['active'] : ""}>
                                        Shop
                                    </button>
                                    <button onClick={() => onChange("POI")} type="button" className={value === "POI" ? styles['active'] : ""}>
                                        Point of Interest
                                    </button>
                                </>
                            )}
                        />
                    </div>
                    <div className={styles['input-row']}>
                        <label htmlFor="name">Title</label>
                        <input {...register("title", {required: true, maxLength: 64})} maxLength={64}
                        aria-invalid={errors.title ? "true" : "false"}
                        />
                        {errors.title?.type === "required" && (
                            <p role="alert">Title is required</p>
                        )}
                    </div>
                    <div className={styles['input-row']}>
                        <label htmlFor="desc">Description</label>
                        <textarea {...register("description", {required: true, maxLength: 256})} maxLength={256}
                        aria-invalid={errors.description ? "true" : "false"} />
                        {errors.description?.type === "required" && (
                            <p role="alert">Description is required</p>
                        )}
                    </div>
                    <Controller
                            name="type"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                    <>
                    {value === "SHOP" 
                    &&
                        <div className={styles['input-row']} style={{
                        gap: "1rem"
                        }}>
                            <h6>Items</h6>
                            <Controller
                                name="items"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                            <>
                                {value.length < 5 &&
                                <div className={styles['item-row']}>
                                    <div className={styles['item-input']}>
                                        <Dropdown options={mcObjects} isBlock={false} selected={selectedItem.item}
                                        setSelected={(value : string) => {
                                        setSelectedItem((prev) => {
                                            return {
                                                ...prev,
                                                item: value
                                            }
                                        })
                                        }} />
                                    </div>
                                    <div className={styles['item-input']}>
                                        <input maxLength={32} placeholder="e.g: 5 diamonds per stack" onChange={(e) => {
                                            setSelectedItem((prev) => {
                                                return {
                                                    ...prev,
                                                    price: e.target.value
                                                }
                                            })
                                        }} type="text" value={selectedItem.price} name="price" id="price" />
                                    </div>
                                        <button onClick={() => {
                                            onChange([...value, selectedItem]);
                                            setSelectedItem({
                                                item: mcObjects[0],
                                                price: ""
                                            })
                                        }} className="default-button" type="button">Add Item</button>
                                    </div>}
                            </>)} />
                            <Controller
                                name="items"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                            <div className={styles['items']}>
                                {value && value.map((item, index) => {
                                return(
                                    <div key={index} className={styles['item']}>
                                        <Image alt="" src={`/images/Blocks/${item.item.toLowerCase().replaceAll(" ", "_")}.png`} width={32} height={32} />
                                        <p>Item: <span>{item.item}</span></p>
                                        <p>Price: <span>{item.price}</span></p>
                                        <button type="button" onClick={() => {
                                            onChange(value.filter((_, i) => i !== index));
                                        }}>Remove</button>
                                    </div>
                                    )
                                })}
                            </div>)} />
                        </div>}
                    </>)
                    }/>
                    <div className={styles['input-row']}>
                        <label htmlFor="name">Minecraft Username</label>
                        <input maxLength={64} {...register("mcName", {required: true, maxLength: 64})} aria-invalid={errors.mcName ? "true" : "false"} />
                        {errors.mcName?.type === "required" && (
                            <p role="alert">Minecraft Name is required</p>
                        )}
                    </div>
                    <div className={styles['coords-row']}>
                        <div className={styles['input-row']}>
                            <label htmlFor="x">X</label>
                            <input maxLength={6} {...register("x", {required: true})} aria-invalid={errors.x ? "true" : "false"} />
                            {errors.x?.type === "required" && (
                                <p role="alert">X is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="y">Y</label>
                            <input  maxLength={6} {...register("y", {required: true})} aria-invalid={errors.y ? "true" : "false"} />
                            {errors.y?.type === "required" && (
                                <p role="alert">Y is required</p>
                            )}
                        </div>
                        <div className={styles['input-row']}>
                            <label htmlFor="z">Z</label>
                            <input maxLength={6} {...register("z", {required: true})} aria-invalid={errors.z ? "true" : "false"} />
                            {errors.x?.type === "required" && (
                                <p role="alert">Z is required</p>
                            )}
                        </div>
                    </div>
                    <div className={styles['input-row']} style={{
                        gap: "1rem"
                    }}>
                        <h6>Images</h6>
                        {uploaded.length <= 3 &&
                        <>
                            <label className={styles['image-upload']} htmlFor="image-upload">
                                <h6>CHOOSE FILE</h6>
                            </label>
                            <input onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                if(event.target.files && event.target.files.length > 0 && event.target.files.length + uploaded.length <= 3){
                                    setUploaded((prev) => {
                                        return [...prev, ...Array.from(event.target.files)];
                                    })
                                }
                            }} type="file" name="image-upload" id="image-upload" style={{display: "none"}} />
                        </>}
                        {
                            uploaded.length > 0 &&
                            <div className={styles['images']}>
                                {uploaded.map((image, index) => {
                                    return(
                                        <div key={index} className={styles['image']}>
                                            <Image alt="" src={typeof image === "string" ? image : URL.createObjectURL(image)} width={1000} height={1000} />
                                            <button type="button" onClick={() => {
                                                setUploaded((prev) => {
                                                    return prev.filter((_, i) => i !== index);
                                                })
                                            }}><RxCross2 /></button>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        {error && <p className={styles['error']}>{error}</p>}
                    </div>
                    <button className="default-button">{
                        isSaving ? 
                        <>
                            <div className={styles['spinner']}></div>
                            Saving
                        </> : "Submit"
                    }</button>
                </form>
                <button onClick={() => handleClose()} className={styles['close']}><RxCross2 /></button>
            </div>
        </div>
    )
})

CreateSubmission.displayName = 'CreateSubmission';
export default CreateSubmission;