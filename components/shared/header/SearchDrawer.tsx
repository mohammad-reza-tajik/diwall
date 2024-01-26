"use client"
import {Close} from "@/components/shared/Icons";
import SearchForm from "@/components/shared/header/SearchForm";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";

interface Props {
    setOpenSearchDrawer: Dispatch<SetStateAction<boolean>>;
    openSearchDrawer: boolean;
}

function SearchDrawer ({setOpenSearchDrawer, openSearchDrawer} : Props) {

    return (
        <div className="relative">
            {openSearchDrawer && (
                <div className="fixed inset-0 bg-black/60 z-50"
                     onClick={() => setOpenSearchDrawer(false)}></div>
            )}
            <div
                className={cn("fixed inset-0 bg-white z-50 transform transition-transform ease-in-out duration-300 ",{"-translate-x-full" : !openSearchDrawer})}>
                <div className="flex flex-col gap-5 p-2">
                    <Button size={"icon"}  onClick={()=>setOpenSearchDrawer(false)}
                            aria-label={"بستن منوی جستجو"}>
                        <Close className={"size-5 fill-white"}/>
                    </Button>

                    <SearchForm />
                </div>
            </div>
        </div>
    )
}

export default SearchDrawer;
