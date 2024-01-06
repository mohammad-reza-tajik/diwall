"use client"
import {useAppSelector} from "@/store";
import SearchForm from "@/components/Globals/Header/SearchForm";
import AuthButton from "@/components/Globals/Header/AuthButton";
import WishlistCartButtons from "@/components/Globals/Header/WishlistCartButtons";
import Logo from "@/components/Globals/Logo";

function HeaderDesktop() {

    const user = useAppSelector(state => state.user);

    return (
        <div className={"hidden md:flex justify-between py-5"}>
            <div className={"flex items-center gap-5 lg:gap-10"}>
                <Logo className={"size-[100px]"} />
                <SearchForm />
            </div>
            <div className={"flex items-center gap-2 lg:gap-5"}>
                <WishlistCartButtons {...user} />
                <AuthButton {...user} />
            </div>
        </div>
    )
}

export default HeaderDesktop
