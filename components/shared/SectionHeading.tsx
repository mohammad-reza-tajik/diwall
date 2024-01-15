"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import formUrlQuery from "@/utils/formUrlQuery";
import {Circle} from "@/components/shared/Icons";
import productFilters from "@/constants/productFilters";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";

interface Props {
    sortBy?: boolean;
    seeAll?: boolean;
    text: string;
    white?: boolean;
    route?: string

}

function SectionHeading({sortBy, route, text, seeAll, white}: Props) {

    const [sort, setSort] = useState("جدیدترین");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (sortBy && searchParams.get("sortBy")) {
            setSort(searchParams.get("sortBy"));
        }
    }, [searchParams, sortBy])

    const sortChangeHandler = (value : string) => {
        setSort(value);
        router.push(formUrlQuery(searchParams.toString(), {
            params: {
                sortBy: value
            }
        }))
    }

    return (
        <div className={`flex justify-between items-center my-5 w-full ${white ? "lg:hidden" : "block"}`}>
            <div className={"flex gap-2 items-center"}>
                <Circle className={`size-5 ${white ? "fill-white" : "fill-primary"}`}/>
                <h2 className={`font-dana-black text-sm md:text-lg ${white ? "text-white" : "text-inherit"}`}>
                    {text}
                </h2>
            </div>
            {
                seeAll ?
                    <Link className={`btn btn-outline btn-sm md:btn-md ${white ? "text-white border-white" : "btn-primary"} rounded-full text-sm`} href={route}>
                        مشاهده بیشتر
                    </Link> :
                    null
            }

            {
                sortBy ?
                    <div className={"flex items-center gap-2"}>
                        <span className={"text-sm md:text-base hidden md:inline-block"}>
                            مرتب سازی بر اساس :
                        </span>
                        <Select onValueChange={sortChangeHandler} defaultValue={sort}>
                            <SelectTrigger className={"w-36 md:w-44"}>
                                <SelectValue>
                                    {sort.split("-").join(" ")}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                    {
                                        productFilters.map((filter, index) => {
                                            return (
                                                <SelectItem value={filter.split(" ").join("-")} key={index}>{filter}</SelectItem>
                                            )
                                        })
                                    }
                            </SelectContent>
                        </Select>
                    </div> :
                    null
            }

        </div>
    )
}

export default SectionHeading