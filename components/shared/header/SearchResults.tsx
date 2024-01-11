"use client"
import {FormEventHandler} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import type {ProductType} from "@/db/productModel";

interface Props {
    isLoading: boolean;
    results: ProductType[];
    search: string;
    submitSearchHandler: FormEventHandler
    closeSearch: () => void;

}

function SearchResults({isLoading, results, search, submitSearchHandler, closeSearch}: Props) {

    const router = useRouter();

    const goToProductHandler = (slug: string) => {
        closeSearch();
        router.push(`/products/${slug}`);

    }

    const showResults = () => {
        if (isLoading) {
            return <div className={"flex w-full justify-center items-center p-3"}><span
                className={"loading loading-spinner text-primary"}></span></div>
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
                        <li key={result._id}>
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
        <ul className="menu bg-white w-full absolute z-50 top-full right-0 p-1 rounded">
            {showResults()}
            {results.length !== 0 && search.trim() !== "" &&
                <button className={"btn btn-primary btn-sm rounded-full mt-3 w-full"} onClick={submitSearchHandler}>
                    مشاهده بیشتر
                </button>
            }
        </ul>

    )
}

export default SearchResults