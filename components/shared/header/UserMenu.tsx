"use client"
import {Logout, Person} from "@/components/shared/Icons";
import {useAppDispatch, userActions} from "@/store";
import {type User} from "@/types/user";
import userMenu from "@/constants/userMenu";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

interface Props {
    user: User;
}

function UserMenu({user}: Props) {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const logoutHandler = () => {
        dispatch(userActions.logout());
        Cookies.remove("token");
        toast.success("با موفقیت از حساب خود خارج شدید");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <Button className={"w-48 h-12 gap-2 max-md:hidden"}>{user.username}</Button>
                    <Button size={"icon"} variant={"outline"} className={"md:hidden"}
                            aria-label={"باز کردن منوی کاربر"}>
                        <Person className={"size-8 fill-primary"}/>
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    userMenu(user).map((item, index) => {
                        return (
                            <DropdownMenuItem className={index === 1 || index === 2 ? "md:hidden" : ""} key={item.href}>
                                <div role={"button"} onClick={()=>router.push(`/accounts/${item.href}`)} className={"flex items-center gap-2"}>
                                    {item.icon}
                                    {item.text}
                                </div>
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