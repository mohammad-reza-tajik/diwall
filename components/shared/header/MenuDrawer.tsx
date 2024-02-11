"use client"
import {useRouter} from "next/navigation";
import Logo from "@/components/shared/Logo";
import navLinks from "@/constants/navLinks";
import {useAppSelector, useAppDispatch, drawerActions} from "@/store";
import {cn} from "@/lib/utils";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import {Close} from "@/components/shared/Icons";
import {Button} from "@/components/ui/button";

function MenuDrawer() {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const {menuDrawerOpen} = useAppSelector(state => state.drawer);

    const menuItemsHandler = (url: string) => {
        dispatch(drawerActions.closeMenuDrawer());
        router.push(url);
    }

    return (
        <div className={"relative"}>
            {menuDrawerOpen && (
                <div className={"fixed inset-0 bg-foreground opacity-50 z-50"}
                     onClick={() => dispatch(drawerActions.closeMenuDrawer())}/>
            )}
            <div
                className={cn("fixed top-0 right-0 h-full w-3/4 sm:w-1/2 flex flex-col gap-2 p-5 bg-background z-50 transition-transform ease-in-out duration-300", {"translate-x-full": !menuDrawerOpen})}>
                <Logo onClick={() => menuItemsHandler("/")} className={"size-20 sm:size-36"}/>
                {
                    navLinks.map((link, index) => {
                        return (
                            <button onClick={() => menuItemsHandler(link.href)} key={index}
                                    className={"flex items-center text-xs sm:text-sm gap-3 hover:bg-black/5 border-b p-2 sm:p-4 hover:fill-primary transition-colors"}>
                                {link.icon}
                                {link.text}
                            </button>
                        )
                    })
                }
                <div className={"flex items-center gap-2 absolute top-3 left-3"}>
                    <ThemeSwitcher/>
                    <Button size={"icon"} variant={"outline"} onClick={() => dispatch(drawerActions.closeMenuDrawer())} aria-label={"بستن منو"}>
                        <Close/>
                    </Button>
                </div>

            </div>
        </div>


    )

}

export default MenuDrawer;
