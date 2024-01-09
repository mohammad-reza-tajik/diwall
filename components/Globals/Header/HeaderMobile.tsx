"use client"
import MenuDrawer from "./MenuDrawer";
import {useState} from "react";
import Link from "next/link";
import SearchDrawer from "./SearchDrawer";
import {useAppSelector} from "@/store";
import UserMenu from "@/components/Globals/Header/UserMenu";
import {Hamburger, Person, Login, Search} from "@/components/Globals/Icons";

function HeaderMobile() {

    const user = useAppSelector(state => state.user);
    const [openMenu, setOpenMenu] = useState(false)


    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const [openSearchDrawer, setOpenSearchDrawer] = useState(false);

    return (
        <div className={"flex justify-between md:hidden py-2"}>
            <div className={"flex items-center gap-4"}>
                <button className={"btn btn-circle border border-primary px-2"} onClick={() => setOpenMenuDrawer(true)}
                        aria-label={"باز کردن منو"}>
                    <Hamburger className={"size-8 fill-primary"}/>
                </button>

                <Link href={"/"} aria-label={"لوگو"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.4 56.16"
                         className={"size-12 fill-gray-700"}>
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path
                                    d="M17.28,54.36C6.48,54.36,0,47.52,0,36.36V22.68H11.88v14c0,3.24,1.8,5,6.12,5h2.16c4.68,0,6.48-2.16,6.48-5V0H38.52V36c0,10.08-6.84,18.36-18,18.36Z"/>
                                <path d="M42.84,0H54.72V40H42.84Z"/>
                                <path
                                    d="M89.64,27.36c1.08,0,1.44.36,1.44,6.12,0,6.12-.36,6.48-1.44,6.48H86c-.5,10.59-7.2,16.2-16.49,16.2H59.76L59,43.56H70.2c2.88,0,4-1.08,4-3.6H73.08c-10.8,0-13.32-5-13.32-13,0-7.56,4.68-14,13-14,7.2,0,13.32,4,13.32,14.4ZM73.08,28.44h1.8v-1.8c0-1.8-.72-2.52-2-2.52a1.82,1.82,0,0,0-1.94,2.09C70.92,27.58,71.28,28.44,73.08,28.44Z"/>
                                <path
                                    d="M93.6,27.36a1.11,1.11,0,0,0,1.08-1.08V16.56h11.88v10.8c0,8.28-5,12.6-11.88,12.6h-5c-1.08,0-1.44-.36-1.44-6.12,0-6.12.36-6.48,1.44-6.48Zm14.76,25.2H89.64v-9h18.72Z"/>
                                <path
                                    d="M115.92,14l9-8.64,11.52,14c3.24,4,4,7.06,4,9.72,0,5.91-3.89,10.8-12.24,10.8H110.88l-1.08-12.6h15.12c.72,0,1.08-.36,1.08-.86a2.57,2.57,0,0,0-.72-1.51Z"/>
                            </g>
                        </g>
                    </svg>
                </Link>
            </div>

            <div className={"flex gap-0.5"}>
                <button className={"btn btn-circle border border-primary px-2"}
                        onClick={() => setOpenSearchDrawer(true)}
                        aria-label={"باز کردن منوی جستجو"}
                >
                    <Search className={"size-8 fill-primary"}/>
                </button>

                <MenuDrawer setOpenMenuDrawer={setOpenMenuDrawer} openMenuDrawer={openMenuDrawer}/>
                <SearchDrawer setOpenSearchDrawer={setOpenSearchDrawer} openSearchDrawer={openSearchDrawer}/>

                {
                    !user.username ?
                        <Link className={"btn btn-circle border border-primary px-2"} href={"/auth"} aria-label={"ورود/ثبت نام"}>
                            <Login className={"size-8 fill-primary"}/>
                        </Link> :
                        <div className={"relative flex justify-center items-center size-12 rounded-full border border-primary"} aria-label={"باز کردن منوی کاربر"}
                             onClick={() => setOpenMenu(prevState => !prevState)}>
                            <Person className={"size-8 fill-primary"}/>
                            <UserMenu open={openMenu} user={user}/>
                        </div>
                }
            </div>
        </div>
    )
}

export default HeaderMobile