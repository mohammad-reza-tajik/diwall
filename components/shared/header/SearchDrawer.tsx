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
            <div
                className={cn("fixed inset-0 bg-background z-50 flex flex-col gap-5 p-2 transform transition-transform ease-in-out duration-300 ", {"-translate-x-full": !searchDrawerOpen})}>
                    <Button size={"icon"} variant={"outline"} onClick={() => dispatch(drawerActions.closeSearchDrawer())}
                            aria-label={"بستن منوی جستجو"}>
                        <Close />
                    </Button>

                    <SearchForm/>
            </div>
    )
}

export default SearchDrawer;
