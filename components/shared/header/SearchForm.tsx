"use client"
import {Close, Search} from "@/components/shared/Icons";
import SearchResults from "@/components/shared/header/SearchResults";
import {FormHTMLAttributes} from "react"
import useSearch from "@/hooks/useSearch";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

function SearchForm(props: FormHTMLAttributes<HTMLFormElement>) {

    const {
        search,
        isLoading,
        isWrong,
        submitSearchHandler,
        searchChangeHandler,
        results,
        closeSearchHandlerDesktop
    } = useSearch();

    return (
            <form onSubmit={submitSearchHandler} className={"flex items-center relative"} {...props}>
                <Button variant={"ghost"} size={"icon"} className={"absolute right-2 z-20"} aria-label={"جستجو"}
                        type={"submit"}>
                    <Search className={"fill-primary size-8"}/>
                </Button>
                <Input
                    placeholder={"جستجو ..."}
                    onChange={searchChangeHandler}
                    value={search}
                    className={"w-full lg:w-[400px] py-7 pr-14 focus:border-primary"}
                />
                {
                    isWrong ?
                        <p className={"absolute top-full right-0 text-destructive text-xs"}>
                            حداقل باید سه کاراکتر وارد شود
                        </p> :
                        <SearchResults isLoading={isLoading} results={results} search={search}
                                       submitSearchHandler={submitSearchHandler}
                                       closeSearch={closeSearchHandlerDesktop}/>
                }
                <Button variant={"ghost"} size={"icon"} aria-label={"پاک کردن فیلد جستجو"} type={"button"}
                        className={cn("absolute left-2 z-50", {"hidden": !search})}
                        onClick={closeSearchHandlerDesktop}>
                    <Close className={"fill-primary size-8"}/>
                </Button>
            </form>
    )
}

export default SearchForm;