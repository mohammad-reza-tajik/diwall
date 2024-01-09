"use client"
import SearchResults from "../SearchResults";
import useSearch from "@/hooks/useSearch";
import {Close, Search} from "@/components/Globals/Icons";

interface Props {
    setOpenSearchDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    openSearchDrawer: boolean;
}

function SearchDrawer ({setOpenSearchDrawer, openSearchDrawer} : Props) {

    const {
        search,
        isWrong,
        submitSearchHandler,
        searchChangeHandler,
        results,
        isLoading,
        closeSearchHandlerMobile
    } = useSearch("mobile", setOpenSearchDrawer);

    return (
        <form className="relative" onSubmit={submitSearchHandler}>
            {openSearchDrawer && (
                <div className="fixed inset-0 bg-black/60 z-50"
                     onClick={() => setOpenSearchDrawer(false)}></div>
            )}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300 ${openSearchDrawer ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col gap-2 p-5">
                        <div className="relative join items-center justify-between w-full gap-3">
                            <button className={"btn btn-sm btn-circle btn-ghost absolute right-2  z-20"} aria-label={"جستجو"}>
                                <Search className={`fill-primary size-8`}/>
                            </button>

                            <input
                                className={`input input-bordered focus:input-primary ${isWrong ? "input-error" : ""} rounded-full max-sm:flex-1 sm:w-72 py-7 pr-12`}
                                placeholder={"جستجو ..."}
                                value={search}
                                onChange={searchChangeHandler}
                            />
                        <button className={"btn btn-primary btn-circle fill-white"} onClick={closeSearchHandlerMobile}
                                aria-label={"بستن منوی جستجو"}>
                            <Close className={"size-5"}/>
                        </button>
                        </div>
                    <div className={"relative"}>
                        {
                            search.trim().length >= 3 &&
                            <SearchResults isLoading={isLoading} results={results} search={search}
                                           submitSearchHandler={submitSearchHandler}
                                           closeSearch={closeSearchHandlerMobile}/>
                        }

                    </div>
                </div>
            </div>
        </form>
    )
}

export default SearchDrawer;
