import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import type {ProductType} from "@/db/productModel";
import fetcher from "@/utils/fetcher";


const useSearch = (device: "desktop" | "mobile", setOpenSearchDrawer?: (open:boolean) => void ) => {

    const router = useRouter()

    const [search, setSearch] = useState("")
    const [isWrong, setIsWrong] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [results, setResults] = useState<ProductType[]>([])

    const submitSearchHandler = async (event : FormEvent) => {
        event.preventDefault()
        if (search.trim() === "") {
            setIsWrong(true)
            setTimeout(() => {
                setIsWrong(false)
            }, 5000)
            return
        }
        setIsWrong(false)
        router.push(`/products?search=${search}`)
        if (device === "mobile") {
            closeSearchHandlerMobile()
        } else {
            closeSearchHandlerDesktop()
        }
    }


    const closeSearchHandlerDesktop = useCallback(() => {
        setIsWrong(false);
        setSearch("");

    }, [])

    const closeSearchHandlerMobile = useCallback(() => {
        setIsWrong(false);
        setSearch("");
        setOpenSearchDrawer(false);

    }, [])

    const searchChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        optimizedFn(event.target.value)
        if (event.target.value.trim() === "") {
            setIsWrong(true)
            setTimeout(() => {
                setIsWrong(false)
            }, 5000)

        } else {
            setIsWrong(false)
        }
    }

    /*** start of debouncing ***/
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 800);
        };
    };


    const handleChange = async (search: string) => {
        setIsLoading(true)
        const res = await fetcher.get(`/api/products?search=${search}`)
        setResults(res.products.slice(0, 4));
        setIsLoading(false)

    };
    const optimizedFn = useCallback(debounce(handleChange), []);

    if (device === "desktop") {

        return {
            search,
            isWrong,
            isLoading,
            searchChangeHandler,
            submitSearchHandler,
            results,
            closeSearchHandlerDesktop
        }
    } else {
        return {search, isWrong, isLoading, searchChangeHandler, submitSearchHandler, results, closeSearchHandlerMobile}

    }
}

export default useSearch