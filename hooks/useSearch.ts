import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {getAllProducts} from "@/actions/product";
import type {Product} from "@/types/product";

const useSearch = () => {

    const router = useRouter();

    const [search, setSearch] = useState("");
    const [isWrong, setIsWrong] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState<Product[]>([]);

    const debounce = (func: Function) => {
        let timer: NodeJS.Timeout | null;
        return function (...args: any) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func(...args);
            }, 800);
        };
    };

    const handleChange = async (search: string) => {
        const res = await getAllProducts({search});
        setResults(res.products.slice(0, 4));
        setIsLoading(false);
    };
    const optimizedFn = useCallback(debounce(handleChange), []);

    const closeSearchHandler = useCallback(() => {
        setIsWrong(false);
        setSearch("");
        setResults([]);
    }, [])

    const submitSearchHandler = (event: FormEvent) => {
        event.preventDefault();
        if (search.trim() === "") {
            setIsWrong(true)
            setTimeout(() => {
                setIsWrong(false)
            }, 5000)
            return
        }
        setIsWrong(false);
        closeSearchHandler();
        router.push(`/products?search=${search}`);
    }


    const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setSearch(event.target.value);
        optimizedFn(event.target.value);
        if (event.target.value.trim() === "") {
            setIsWrong(true);
            setTimeout(() => {
                setIsWrong(false);
            }, 5000)

        } else {
            setIsWrong(false);
        }
    }


    return {
        search,
        isWrong,
        isLoading,
        setSearch,
        searchChangeHandler,
        submitSearchHandler,
        results,
        closeSearchHandler,
    }

}

export default useSearch