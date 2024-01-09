"use client"
import {Logout} from "@/components/shared/Icons";
import Link from "next/link";
import {useAppDispatch, userActions} from "@/store";
import {enqueueSnackbar} from "notistack";
import {UserType} from "@/db/userModel";
import {useCallback} from "react";
import userMenu from "@/constants/userMenu";

interface Props {
    open: boolean;
    user: UserType;
}

function UserMenu({open, user}: Props) {

    const dispatch = useAppDispatch();

    const logoutHandler = useCallback(() => {
        dispatch(userActions.logout());
        enqueueSnackbar("با موفقیت از حساب خود خارج شدید", {
            variant: "info",
        });
    },[dispatch])

    return (
        <ul className={`menu bg-white w-56 absolute ${!open ? "invisible" : "visible"} z-50 top-full left-0 p-1 text-gray-600 text-xs md:text-sm rounded`}>
            {
                userMenu(user).map((item,index)=>{
                    return (
                        <li className={index === 1 || index === 2 ? "md:hidden" : ""} key={item.href}>
                            <Link href={`/accounts/${item.href}`}>
                                {item.icon}
                                {item.text}
                            </Link>
                        </li>
                    )
                })
            }

            <li>
                <button onClick={logoutHandler}>
                    <Logout className={"fill-primary size-5"}/>
                    خروج از حساب کاربری
                </button>
            </li>
        </ul>
    )
}

export default UserMenu;