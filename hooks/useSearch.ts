import {useCallback, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import type {ProductType} from "../db/productModel";


const useSearch = (device: "desktop" | "mobile", props?: { onOpen: (boolean) => void }) => {

    const router = useRouter()

    const [search, setSearch] = useState<string>("")
    const [isWrong, setIsWrong] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [results, setResults] = useState<Array<ProductType>>([])

    const submitSearchHandler = (e) => {
        e.preventDefault()
        if (search.trim() === "") {
            setIsWrong(true)
            setTimeout(() => {
                setIsWrong(false)
            }, 5000)
            return
        }
        setIsWrong(false)
        axios.post(`/api/products`, {search}).then(_ => {
            router.push(
                {
                    pathname: `/products`,
                    query: {
                        search,
                        page: 1
                    }
                })
            if (device === "mobile") {
                closeSearchHandlerMobile()
            } else {
                closeSearchHandlerDesktop()
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const closeSearchHandlerDesktop = useCallback(() => {
        setSearch("")

    }, [])

    const closeSearchHandlerMobile = useCallback(() => {
        setSearch("")
        props.onOpen(false)

    }, [])

    const searchChangeHandler = (e) => {
        setSearch(e.target.value)
        optimizedFn(e.target.value)
        if (e.target.value.trim() === "") {
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


    const handleChange = async (value) => {
        setIsLoading(true)
        const res = await axios.post(`/api/products`, {search: value})
        setResults(res.data.products.slice(0, 4));
        setIsLoading(false)
        // console.log(res.data)

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
            closeSearchHandlerDesktop,
            router
        }
    } else {
        return {search, isWrong, isLoading, searchChangeHandler, submitSearchHandler, results, closeSearchHandlerMobile}

    }
}

export default useSearch