import features from "@/constants/features";

function Features () {
    return (
        <section className={"grid grid-cols-2 lg:grid-cols-4 gap-y-10"}>
            {
                features.map((feature , index) => {
                    return (
                        <div className={"flex flex-col gap-2 items-center"} key={index}>
                            {feature.icon}
                            <div className={"flex flex-col items-center gap-2"}>
                                <span className={"font-dana-bold text-sm sm:text-base lg:text-lg"}>
                                    {feature.title}
                                </span>
                                <p className={"text-center text-xs md:text-sm"}>
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