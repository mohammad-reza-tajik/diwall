"use client"
import {Logout} from "@/components/shared/Icons";
import Link from "next/link";
import {useAppDispatch, userActions} from "@/store";
import {enqueueSnackbar} from "notistack";
import {type User} from "@/types/user";
import userMenu from "@/constants/userMenu";
import {DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

interface Props {
    user: User;
}

function UserMenu({user}: Props) {

    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(userActions.logout());
        enqueueSnackbar("با موفقیت از حساب خود خارج شدید", {variant: "info"});
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={"w-48 h-12 gap-2"}>{user.username}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    userMenu(user).map((item, index) => {
                        return (
                            <DropdownMenuItem className={index === 1 || index === 2 ? "md:hidden" : ""} key={item.href}>
                                <Link href={`/accounts/${item.href}`} className={"flex gap-2"}>
                                    {item.icon}
                                    {item.text}
                                </Link>
                            </DropdownMenuItem>
                        )
                    })
                }
                <DropdownMenuItem onClick={logoutHandler}>
                    <Logout className={"fill-primary size-5"}/>
                    <span>خروج از حساب کاربری</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserMenu;