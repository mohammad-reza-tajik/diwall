"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import buildURL from "@/lib/utils/buildURL";
import {Circle} from "@/components/shared/Icons";
import productFilters from "@/constants/productFilters";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import cn from "@/lib/utils/cn";

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
    const sortQuery = searchParams.get("sortBy");

    useEffect(() => {
        if (sortBy && sortQuery) {
            setSort(sortQuery);
        }
    }, [sortBy, sortQuery])

    const sortChangeHandler = (value: string) => {
        setSort(value);
        router.push(buildURL({
            params: {
                sortBy: value
            }
        }))
    }

    return (
        <div className={cn("flex justify-between items-center my-5 w-full", {"lg:hidden": white})}>
            <div className={"flex gap-2 items-center"}>
                <Circle className={cn("size-5", {"fill-white": white , "fill-primary" : !white})}/>
                <h2 className={cn("font-dana-bold text-sm md:text-lg", {"text-white": white})}>
                    {text}
                </h2>
            </div>
            {
                seeAll && route ?
                    <Button asChild variant={"outline"}
                            className={cn("max-md:text-xs max-md:p-2", {"text-white border-white": white})}>
                        <Link href={route}>
                            مشاهده بیشتر
                        </Link>
                    </Button> :
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
                                            <SelectItem value={filter.split(" ").join("-")}
                                                        key={index}>{filter}</SelectItem>
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