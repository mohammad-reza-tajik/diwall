import Link from "next/link";
import {Login} from "@/components/shared/Icons";
import UserMenu from "@/components/shared/header/UserMenu";
import {type User} from "@/types/user";
import {Button} from "@/components/ui/button";

interface Props {
    user ?: User
}
function AuthButton({user}: Props) {

    return (
        !user ?
            <Button asChild className={"w-48 h-12 gap-2"}>
                <Link href={"/auth"}>
                    <Login className={"fill-white size-6"}/>
                    ورود / ثبت نام
                </Link>
            </Button> :
            <UserMenu user={user}/>
    )
}

export default AuthButton;