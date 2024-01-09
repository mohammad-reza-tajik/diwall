import Image from "next/image"
function MiddleSection () {
    return (
        <section className={"flex my-10"}>
                <Image src={"/pictures/3D-posters.jpg"} width={400} height={200} alt={"3D-posters"}
                       className="object-contain w-1/2 hidden md:inline-block h-auto"/>
                <Image src={"/pictures/customize-poster.jpg"} width={400} height={200} alt={"customize-poster"}
                       className="object-contain w-full md:w-1/2 inline-block h-auto"/>
        </section>
    )
}

export default MiddleSection