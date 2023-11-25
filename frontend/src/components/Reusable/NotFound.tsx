import Image from 'next/image';

export default function NotFound(props: {
    title?: string,
    description?: string,
}){

    return(
        <div className="flex flex-col w-full items-center gap-4">
            <Image src="/images/NotFound.svg" width={200} height={100} alt="404" quality={100}/>
            <div className="w-full flex flex-col items-center">
                <h2 className='text-white font-semibold text-xl' style={{fontFamily: "SpaceGrotesk-Variable"}}>{props.title}</h2>
                <p className='text-gray-300 font-normal'>{props.description}</p>
            </div>
        </div>
    )

}