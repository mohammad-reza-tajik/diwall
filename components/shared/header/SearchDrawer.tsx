"use client"
import {Close} from "@/components/shared/Icons";
import SearchForm from "@/components/shared/header/SearchForm";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector, drawerActions} from "@/store";


function SearchDrawer() {

    const dispatch = useAppDispatch();
    const {searchDrawerOpen} = useAppSelector(state => state.drawer);

    return (
        <div className="relative">
            {searchDrawerOpen && (
                <div className="fixed inset-0 bg-black/60 z-50"
                     onClick={() => dispatch(drawerActions.closeSearchDrawer())}></div>
            )}
            <div
                className={cn("fixed inset-0 bg-white z-50 transform transition-transform ease-in-out duration-300 ", {"-translate-x-full": !searchDrawerOpen})}>
                <div className="flex flex-col gap-5 p-2">
                    <Button size={"icon"} onClick={() => dispatch(drawerActions.closeSearchDrawer())}
                            aria-label={"بستن منوی جستجو"}>
                        <Close className={"size-5 fill-white"}/>
                    </Button>

                    <SearchForm/>
                </div>
            </div>
        </div>
    )
}

export default SearchDrawer;
