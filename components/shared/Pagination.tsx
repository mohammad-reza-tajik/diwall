"use client"
import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import formUrlQuery from "@/utils/formUrlQuery";
import {Arrow} from "@/components/shared/Icons";
import {Button} from "@/components/ui/button";

interface Props {
    lastPage: number;
    currentPage: number;
}

function Pagination({lastPage, currentPage}: Props) {

    const [page, setPage] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageQuery = searchParams.get("page")

    useEffect(() => {
        if (pageQuery) {
            setPage(+pageQuery)
        }
    }, [pageQuery])

    const handlePageChange = (page: number) => {
        setPage(page);
        router.push(formUrlQuery(searchParams.toString(), {
            params: {
                page
            }
        }), {scroll: true})
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (lastPage <= 5) {
            for (let i = 1; i <= lastPage; i++) {
                pageNumbers.push(
                    <Button asChild size={"icon"} variant={currentPage === i ? "default" : "outline"}>
                        <li
                            key={i}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </li>
                    </Button>
                );
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(lastPage, currentPage + 2);

            if (currentPage <= 3) {
                endPage = 5;
            } else if (currentPage >= lastPage - 2) {
                startPage = lastPage - 4;
            }

            if (startPage > 1) {
                pageNumbers.push(
                    <Button asChild size={"icon"} variant={"outline"}>
                        <li
                            key="start-ellipsis"
                            className="px-3 py-2 text-gray-700"
                            onClick={() => handlePageChange(startPage - 1)}
                        >
                            …
                        </li>
                    </Button>
                );
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <Button asChild size={"icon"} variant={currentPage === i ? "default" : "outline"}>

                        <li
                            key={i}
                            className={`${
                                page === i ? 'btn-primary' : 'btn-ghost'
                            } btn btn-circle btn-sm md:btn-md text-sm`}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </li>
                    </Button>
                );
            }

            if (endPage < lastPage) {
                pageNumbers.push(
                    <li
                        key="end-ellipsis"
                        className="px-3 py-2 text-gray-700"
                        onClick={() => handlePageChange(endPage + 1)}
                    >
                        …
                    </li>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <section className="flex justify-center w-full my-7">
            <ul className="flex gap-2">
                <li>
                    <Button size={"icon"} variant={"outline"}
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                    >
                        <Arrow className={"size-5 rotate-180"}/>
                    </Button>
                </li>
                {renderPageNumbers()}
                <li>
                    <Button size={"icon"} variant={"outline"}
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === lastPage}
                    >
                        <Arrow className={"size-5"}/>
                    </Button>
                </li>
            </ul>
        </section>
    );
}

export default Pagination;