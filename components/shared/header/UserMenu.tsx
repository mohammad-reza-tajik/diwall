"use client"
import {Logout, Person} from "@/components/shared/Icons";
import {useAppDispatch, userActions} from "@/store";
import {type User} from "@/types/user";
import userMenu from "@/constants/userMenu";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {logout} from "@/actions/user/auth";

interface Props {
    user: User;
}

function UserMenu({user}: Props) {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const logoutHandler = async () => {
        await toast.promise(logout(), {
            loading: "در حال خروج از حساب ...",
            success: (res) => {
                if (!res.ok) {
                    throw new Error(res.message)
                }
                dispatch(userActions.logout());
                return res.message
            },
            error: (err) => {
                return err.message
            }
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className={"w-48 h-12 max-md:hidden"} asChild>
                <span>
                    {user.username}
                </span>
                </Button>
                <Button size={"icon"} variant={"outline"} className={"md:hidden"} aria-label={"باز کردن منوی کاربر"}
                        asChild>
                    <Person className={"size-8 fill-primary"}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    userMenu(user).map((item, index) => {
                        return (
                            <DropdownMenuItem className={index === 1 || index === 2 ? "md:hidden" : ""} key={item.href}>
                                <div role={"button"} onClick={() => router.push(`/accounts/${item.href}`)}
                                     className={"flex items-center gap-2 text-xs md:text-sm"}>
                                    {item.icon}
                                    {item.text}
                                </div>
                            </DropdownMenuItem>
                        )
                    })
                }
                <DropdownMenuItem>
                    <div role={"button"} onClick={logoutHandler}
                         className={"flex items-center gap-2 text-xs md:text-sm"}>
                        <Logout className={"fill-primary size-5"}/>
                        خروج از حساب کاربری
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserMenu;