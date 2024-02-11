"use client"
import MenuDrawer from "@/components/shared/header/MenuDrawer";
import Link from "next/link";
import SearchDrawer from "@/components/shared/header/SearchDrawer";
import {drawerActions, useAppDispatch, useAppSelector} from "@/store";
import UserMenu from "@/components/shared/header/UserMenu";
import {Hamburger, Login, Search} from "@/components/shared/Icons";
import {Button} from "@/components/ui/button";

function HeaderMobile() {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    return (
        <div className={"flex justify-between items-center md:hidden py-1"}>
            <div className={"flex items-center gap-2"}>
                <Button size={"icon"} variant={"outline"} onClick={() => dispatch(drawerActions.openMenuDrawer())}
                        aria-label={"باز کردن منو"}>
                    <Hamburger className={"size-8 fill-primary"}/>
                </Button>

                <Link href={"/"} aria-label={"لوگو"} className={"font-dana-black text-xl"}>
                    دیوال
                </Link>
            </div>

            <MenuDrawer />
            <SearchDrawer />

            <div className={"flex gap-0.5 items-center"}>
                <Button size={"icon"} variant={"outline"}
                        onClick={() => dispatch(drawerActions.openSearchDrawer())}
                        aria-label={"باز کردن منوی جستجو"}
                >
                    <Search className={"size-8 fill-primary"}/>
                </Button>

                {
                    !user ?
                        <Button asChild size={"icon"} variant={"outline"}>
                            <Link href={"/auth"} aria-label={"ورود/ثبت نام"}>
                                <Login className={"size-8 fill-primary"}/>
                            </Link>
                        </Button> :
                        <UserMenu user={user}/>
                }
            </div>
        </div>
    )
}

export default HeaderMobile