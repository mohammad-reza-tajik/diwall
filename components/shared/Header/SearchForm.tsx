"use client"
import {Close, Search} from "@/components/shared/Icons";
import SearchResults from "@/components/shared/SearchResults";
import {FormHTMLAttributes} from "react"
import useSearch from "@/hooks/useSearch";

function SearchForm(props:FormHTMLAttributes<HTMLFormElement>) {

    const {
        search,
        submitSearchHandler,
        searchChangeHandler,
        isWrong,
        results,
        isLoading,
        closeSearchHandlerDesktop
    } = useSearch("desktop");

    return (
        <form onSubmit={submitSearchHandler} className={"relative flex items-center"} {...props}>
            <button className={"btn btn-sm btn-circle btn-ghost absolute right-2  z-20"} aria-label={"جستجو"}>
                <Search className={`fill-primary size-8`}/>
            </button>

            <input
                className={`input input-bordered focus:input-primary ${isWrong ? "input-error" : ""} rounded-full w-[300px] lg:w-[400px] py-7 pr-12`}
                placeholder={"جستجو ..."}
                value={search}
                onChange={searchChangeHandler}
            />
            <button aria-label={"پاک کردن فیلد جستجو"}
                    className={`btn btn-circle btn-sm btn-ghost absolute left-2 ${!search && "hidden"}`}
                    onClick={closeSearchHandlerDesktop}>
                <Close className={`fill-primary size-8`}/>
            </button>

            <div className={"flex absolute right-0 top-full z-20 w-full rounded"}>
                {
                    search.trim().length >= 3 &&
                    <SearchResults isLoading={isLoading} results={results} search={search}
                                   submitSearchHandler={submitSearchHandler}
                                   closeSearch={closeSearchHandlerDesktop}/>
                }
            </div>
        </form>
    )
}

export default SearchForm;