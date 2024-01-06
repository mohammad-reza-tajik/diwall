"use client"
import Link from "next/link";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import formUrlQuery from "@/utils/formUrlQuery";
import {Circle} from "@/components/Globals/Icons";
import productFilters from "@/constants/productFilters";

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

    const sortChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
        router.push(formUrlQuery(searchParams.toString(), {
            params: {
                sortBy: event.target.value
            }
        }))
    }

    return (
        <div className={`flex justify-between items-center my-5 w-full ${white ? "lg:hidden" : "block"}`}>
            <div className={"flex gap-2 items-center"}>
                <Circle className={`size-5 ${white ? "fill-white" : "fill-primary"}`}/>
                <h4 className={`font-dana-black text-sm md:text-lg ${white ? "text-white" : "text-inherit"}`}>
                    {text}
                </h4>
            </div>
            {
                seeAll ?
                    <Link className={`btn btn-outline btn-sm md:btn-md ${white ? "text-white border-white" : "btn-primary"} rounded-full text-sm`} href={route}
                          aria-label="مشاهده همه">
                        مشاهده همه
                    </Link> :
                    null
            }

            {
                sortBy ?
                    <div className={"flex items-center gap-2"}>
                        <span className={"text-sm md:text-base hidden md:inline-block"}>
                            مرتب سازی بر اساس :
                        </span>
                        <select id="filters"
                                value={sort}
                                className="border text-sm rounded focus:border-primary focus:outline-none p-2 appearance-none"
                                onChange={sortChangeHandler}>
                            {
                                productFilters.map((filter, index) => {
                                    return (
                                        <option value={filter.split(" ").join("-")} key={index}>{filter}</option>
                                    )
                                })
                            }
                        </select>
                    </div> :
                    null
            }

        </div>
    )
}

export default SectionHeading