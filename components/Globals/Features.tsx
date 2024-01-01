import features from "@/constants/features";

function Features () {
    return (
        <section className={"flex flex-wrap"}>
            {
                features.map((feature , index) => {
                    return (
                        <div className={"flex w-1/2 lg:w-1/4 gap-5 justify-evenly items-center"} key={index}>
                            {feature.icon}
                            <div className={"flex flex-col items-center gap-2"}>
                                <span className={"font-dana-black text-sm sm:text-base lg:text-lg"}>
                                    {feature.title}
                                </span>
                                <p className={"font-dana-bold text-center text-xs md:text-sm"}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default Features