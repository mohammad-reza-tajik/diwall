import {HeartOutlined, Logout, Person, ShoppingBag} from "@/components/Globals/Icons";
import Link from "next/link";
import {useAppDispatch, userActions} from "@/store";
import {enqueueSnackbar} from "notistack";
import {UserType} from "@/db/userModel";

interface Props {
    open: boolean;
    device: "desktop" | "mobile";
    user: UserType;
}

function UserMenu({open, device, user}: Props) {

    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(userActions.logout());
        enqueueSnackbar("با موفقیت از حساب خود خارج شدید", {
            variant: "info",
        });
    }

    if (!open) return null;

    return (
        <ul className="menu bg-white rounded-box absolute top-full right-0 text-gray-600 text-xs">
            <li>
                <Link href={`/accounts/${user?._id}?tab=0`}>
                    <Person className={"fill-primary size-5"}/>
                    حساب کاربری
                </Link>
            </li>
            <li className={"inline-block md:hidden"}>
                <Link href={`/accounts/${user?._id}?tab=1`}>
                    <HeartOutlined className={"fill-primary size-5"}/>
                    لیست علاقمندی ها
                </Link>
            </li>
            <li className={"inline-block md:hidden"}>
                <Link href={`/accounts/${user?._id}?tab=2`}>
                    <ShoppingBag className={"fill-primary size-5"}/>
                    سبد خرید
                </Link>
            </li>
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