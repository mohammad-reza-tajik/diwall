import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {getAllProducts} from "@/actions/product";
import type {Product} from "@/types/product";
import {drawerActions, useAppDispatch, useAppSelector} from "@/store";

const useSearch = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();
    const {searchDrawerOpen} = useAppSelector(state => state.drawer);

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
        if (searchDrawerOpen) {
            dispatch(drawerActions.closeSearchDrawer());
        }
    }, [dispatch, searchDrawerOpen])

    const submitSearchHandler = (event: FormEvent) => {
        event.preventDefault();
        if (search.trim().length < 3) {
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
        setIsWrong(false);
        setSearch(event.target.value);
        optimizedFn(event.target.value);
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