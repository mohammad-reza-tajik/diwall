"use client"
import {Close, Search} from "@/components/Globals/Icons";
import SearchResults from "@/components/Globals/SearchResults";
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
            {/*<div className={`tooltip tooltip-error tooltip-bottom ${isWrong && "tooltip-open"}`} data-tip={"لطفا عبارتی برای جستجو وارد کنید!"}>*/}
            <button className={"btn btn-sm btn-circle btn-ghost -ml-11 z-20"}>
                <Search className={`fill-primary size-8 ${search && "opacity-0"}`}/>
            </button>

            <input
                className={"input input-bordered focus:input-primary md:w-[350px] lg:w-[400px] pr-12"}
                placeholder={"جستجو ..."}
                value={search}
                onChange={searchChangeHandler}
            />
            {/*</div>*/}
            <button aria-label="clear search field"
                    className={`btn btn-circle btn-sm btn-ghost -mr-11 ${!search && "opacity-0"}`}
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