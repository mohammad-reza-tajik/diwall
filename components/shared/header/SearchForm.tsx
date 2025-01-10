"use client"
import {Close, Search} from "@/components/shared/Icons";
import SearchResults from "@/components/shared/header/SearchResults";
import useSearch from "@/hooks/useSearch";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import  cn  from "@/lib/utils/cn"


function SearchForm() {

    const {
        search,
        setSearch,
        isLoading,
        isWrong,
        submitSearchHandler,
        searchChangeHandler,
        results,
        closeSearchHandler,
    } = useSearch();

    return (
            <search className={"flex items-center relative"}>
                <Button variant={"ghost"} size={"icon"} className={"absolute right-2 z-20"}
                        onClick={submitSearchHandler} aria-label={"جستجو"}
                >
                    <Search className={"fill-primary size-8"}/>
                </Button>
                <Input
                    placeholder={"جستجو ..."}
                    onChange={searchChangeHandler}
                    value={search}
                    type={"search"}
                    className={"w-full lg:w-80 py-7 pr-14 focus:border-primary"}
                />
                {
                    isWrong ?
                        <p className={"absolute top-[120%] right-0 text-destructive text-xs"}>
                            حداقل باید سه کاراکتر وارد شود
                        </p> :
                        <SearchResults isLoading={isLoading} results={results} search={search}
                                       submitSearchHandler={submitSearchHandler}
                                       closeSearch={closeSearchHandler}/>
                }
                <Button variant={"ghost"} size={"icon"} aria-label={"پاک کردن فیلد جستجو"} onClick={() => setSearch("")}
                        className={cn("absolute left-2 z-50", {"hidden": search.trim().length === 0})}
                >
                    <Close className={"fill-primary size-8"}/>
                </Button>
            </search>
    )
}

export default SearchForm;