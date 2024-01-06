import Image from "next/legacy/image"
import showcase from "@/constants/showcase";

function ShowCase() {
    return (
        <section className={"grid grid-cols-3 md:grid-cols-6 p-5 my-10 rounded border gap-10 sm:gap-16 lg:gap-20"}>
            {
                showcase.map((image)=>{
                    return (
                            <Image key={image.alt} src={`/pictures/showcase/${image.name}.svg`} alt={image.alt}
                                   width={100} height={100}/>
                    )
                })
            }
        </section>
    )
}

export default ShowCase