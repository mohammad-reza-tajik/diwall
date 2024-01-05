import Image from "next/legacy/image"
import showcase from "@/constants/showcase";

function ShowCase() {
    return (
        <section className={"grid grid-cols-3 md:grid-cols-6 gap-10 p-5 my-10 rounded border"}>
            {
                showcase.map((image)=>{
                    return (
                            <Image key={image.alt} src={`/assets/pictures/showcase/${image.name}.svg`} alt={image.alt}
                                   width={100} height={100}/>
                    )
                })
            }
        </section>
    )
}

export default ShowCase