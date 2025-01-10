"use client"
import {FormEventHandler} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Loader from "@/components/shared/Loader";
import type {Product} from "@/types/product";
import cn from "@/lib/utils/cn"
import {Button} from "@/components/ui/button";

interface Props {
    isLoading: boolean;
    results: Product[];
    search: string;
    submitSearchHandler: FormEventHandler
    closeSearch: () => void;

}

function SearchResults({isLoading, results, search, submitSearchHandler, closeSearch}: Props) {

    const router = useRouter();

    function goToProductHandler(slug: string) {
        closeSearch();
        router.push(`/products/${slug}`);
    }

    function showResults () {
        if (isLoading && search.trim().length >= 3) {
            return (
                <div className={"flex w-full justify-center items-center p-3"}>
                    <Loader/>
                </div>
            )
        } else {
            if (results.length === 0 && search.trim().length >= 3) {
                return (
                    <p className={"flex p-5 text-base justify-center items-center"}>
                        نتیجه ای یافت نشد!
                    </p>
                )

            } else if (search.trim().length >= 3 && results.length !== 0) {
                return results.map((result) => {
                    return (
                        <li key={result._id} className={"p-2 hover:bg-muted rounded transition-all"}>
                            <div className={"flex items-center gap-2"} role={"button"}
                                 onClick={() => goToProductHandler(result.slug)}>
                                <Image
                                    src={`/pictures/products/${result.slug}.jpg`}
                                    alt={result.title}
                                    width={50}
                                    height={50}
                                    className={"rounded-full size-10"}
                                />
                                <span className={"text-xs md:text-sm"}>
                                    {result.title}
                                </span>
                            </div>
                        </li>
                    )
                })
            }
        }
    }

    return (
        <ul className={cn("p-1 bg-background w-full absolute z-50 top-full right-0 rounded border border-t-transparent", {"hidden": search.trim().length < 3})}>
            {showResults()}
            {results.length !== 0 && search.trim() !== "" &&
                <Button className={"mt-3 w-full"} onClick={submitSearchHandler}>
                    مشاهده بیشتر
                </Button>
            }
        </ul>

    )
}

export default SearchResults