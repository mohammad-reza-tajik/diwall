"use client"
import {useState , useEffect} from "react";
import {useRouter , useSearchParams} from "next/navigation";
import formUrlQuery from "@/utils/formUrlQuery";
import {Arrow} from "@/components/Globals/Icons";

interface Props {
    lastPage:number;
    currentPage:number;
}
function Pagination  ({lastPage,currentPage} : Props)  {

    const [page, setPage] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(()=>{
        if (searchParams.get("page")){
            setPage(+searchParams.get("page"))
        }


    },[searchParams])

    const handlePageChange = (page : number) => {
        setPage(page);
        router.push(formUrlQuery(searchParams.toString(),{
            params : {
                page
            }
        }),{scroll : true})
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (lastPage <= 5) {
            for (let i = 1; i <= lastPage; i++) {
                pageNumbers.push(
                    <li
                        key={i}
                        className={`${
                            currentPage === i ? 'btn-primary' : 'btn-ghost'
                        } btn btn-circle btn-sm md:btn-md text-sm `}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </li>
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
                    <li
                        key="start-ellipsis"
                        className="px-3 py-2 text-gray-700"
                        onClick={() => handlePageChange(startPage - 1)}
                    >
                        …
                    </li>
                );
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <li
                        key={i}
                        className={`${
                            page === i ? 'btn-primary' : 'btn-ghost'
                        } btn btn-circle btn-sm md:btn-md text-sm`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </li>
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
                    <button
                        className={`btn btn-circle text-sm btn-sm md:btn-md ${page === 1 ? 'btn-disabled' : 'btn-ghost'} `}
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        <Arrow className={"size-5 rotate-180"} />
                    </button>
                </li>
                {renderPageNumbers()}
                <li>
                    <button
                        className={`btn btn-circle text-sm btn-sm md:btn-md ${page === lastPage ? 'btn-disabled' : 'btn-ghost'} `}
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === lastPage}
                    >
                        <Arrow className={"size-5"} />
                    </button>
                </li>
            </ul>
        </section>
    );
}
export default Pagination;