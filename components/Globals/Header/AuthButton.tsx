"use client"
import Link from "next/link";
import {Login} from "@/components/Globals/Icons";
import { useState} from "react";
import {UserType} from "@/db/userModel";
import UserMenu from "@/components/Globals/Header/UserMenu";

function AuthButton(user: UserType) {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        user?.username === null ?
            <Link className={"btn btn-primary w-48 rounded-full"} href={"/auth"} aria-label="login/signup">
                <Login className={"fill-white size-6"}/>
                ورود / ثبت نام
            </Link> :
            <button className={"btn btn-primary font-dana-bold w-48 relative py-2 rounded-full"} aria-label="show menu"
                    onClick={() => setOpenMenu((prevState)=>!prevState)}
            >
                {user?.username}
                <UserMenu user={user} open={openMenu}/>
            </button>


    )
}

export default AuthButton;