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
            return <span className={"loading loading-spinner text-primary"}></span>
        } else {
            if (results.length === 0 && search.trim().length >= 3) {
                return (
                    <p className={"flex justify-center items-center"}>
                        نتیجه ای یافت نشد!
                    </p>
                )

            } else if (search.trim().length >= 3 && results.length !== 0) {
                return results.map((result) => {
                    return (
                        <li key={result._id}>
                            <button className={"btn btn-ghost items-center w-full"} onClick={() => goToProductHandler(result.slug)}>
                            <Image
                                src={`/assets/pictures/products/${result.slug}.jpg`}
                                alt={result.title}
                                width={50}
                                height={50}
                            />
                            {result.title}
                            </button>
                        </li>

                    )

                })
            }
        }
    }


    return (
        <ul className="menu bg-white w-full gap-2 shadow absolute z-50 top-full right-0 p-1 text-gray-600 text-xs md:text-sm rounded">
            {showResults()}
            {results.length !== 0 && search.trim() !== "" &&
                <button className={"btn btn-primary btn-sm rounded-full"} onClick={submitSearchHandler}>
                    مشاهده بیشتر
                </button>
            }
        </ul>

    )
}

export default SearchResults