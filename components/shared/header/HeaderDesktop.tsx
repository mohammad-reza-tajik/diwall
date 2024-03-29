"use client"
import {useAppSelector} from "@/store";
import SearchForm from "@/components/shared/header/SearchForm";
import AuthButton from "@/components/shared/header/AuthButton";
import WishlistCartButtons from "@/components/shared/header/WishlistCartButtons";
import Logo from "@/components/shared/Logo";


function HeaderDesktop() {

    const user = useAppSelector(state => state.user.user);

    return (
        <div className={"hidden md:flex justify-between py-5"}>
            <div className={"flex items-center gap-5"}>
                <Logo className={"size-[100px]"} />
                <SearchForm />
            </div>
            <div className={"flex items-center gap-2"}>
                <WishlistCartButtons user={user} />
                <AuthButton user={user} />
            </div>
        </div>
    )
}

export default HeaderDesktop
