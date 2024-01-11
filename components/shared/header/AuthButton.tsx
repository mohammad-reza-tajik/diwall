"use client"
import Link from "next/link";
import {Login} from "@/components/shared/Icons";
import { useState} from "react";
import {UserType} from "@/db/userModel";
import UserMenu from "@/components/shared/header/UserMenu";

function AuthButton(user: UserType) {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        user?.username === null ?
            <Link className={"btn btn-primary w-48 rounded-full"} href={"/auth"}>
                <Login className={"fill-white size-6"}/>
                ورود / ثبت نام
            </Link> :
            <div role={"button"} className={"flex justify-center items-center w-48 gap-2 bg-primary text-white fill-white shadow relative py-2 rounded-full"} aria-label={"باز کردن منوی کاربر"}
                    onClick={() => setOpenMenu((prevState)=>!prevState)}
            >
                <span className={"line-clamp-1"}>{user?.username}</span>
                <UserMenu user={user} open={openMenu}/>
            </div>


    )
}

export default AuthButton;