import {useEffect, useMemo, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import formUrlQuery from "@/utils/formUrlQuery";

interface Params {
    totalCount: number;
    itemsPerPage: number;
    siblingCount?: number,
}

function range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({length}, (_, index) => index + start);
}

function usePagination({itemsPerPage, siblingCount = 1, totalCount}: Params) {

    let paginationRange: (string | number)[];
    const [currentPage, setPage] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageQuery = searchParams.get("page");

    useEffect(() => {
        if (pageQuery) {
            setPage(+pageQuery)
        }
    }, [pageQuery])

    console.log(currentPage)


    const pageChangeHandler = (page: number | string) => {
        setPage(+page);
        router.push(formUrlQuery(searchParams.toString(), {
            params: {
                page
            }
        }), {scroll: true})
    };

    return useMemo(() => {

        const lastPage = Math.ceil(totalCount / itemsPerPage);
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= lastPage) {
            paginationRange = range(1, lastPage);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < lastPage - 2;

        const firstPageIndex = 1;
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            paginationRange = [...leftRange, "...", lastPage];
        } else if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                lastPage - rightItemCount + 1,
                lastPage
            );
            paginationRange = [firstPageIndex, "...", ...rightRange];
        } else {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            paginationRange = [firstPageIndex, "...", ...middleRange, "...", lastPage];
        }

        return {paginationRange, currentPage, pageChangeHandler};

    }, [totalCount, itemsPerPage, siblingCount, currentPage]);


}

export default usePagination;