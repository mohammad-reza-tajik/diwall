import Link from "next/link";
import places from "@/constants/places";
import {Circle} from "@/components/shared/Icons";

function Places() {
    return (
        <section className={"flex flex-col gap-5 md:gap-8 my-20"}>
            <div className={"flex items-center justify-center gap-2"}>
                <Circle className={"fill-primary size-4 lg:size-7"}/>
                <h2 className={"font-dana-black text-lg lg:text-2xl"}>
                    <span className={"text-primary"}>برای کجا</span>
                    &nbsp;
                    می خواهید ؟
                </h2>
            </div>
            <div className={"flex flex-wrap items-center"}>
                {
                    places.map((item, index) => {
                        return (
                            <Link key={index} className={"flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/6 gap-5 p-8 border hover:fill-primary hover:text-primary transition-all"} href={item.href}>
                                {item.icon}
                                <span className={"font-dana-bold"}>{item.text}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Places