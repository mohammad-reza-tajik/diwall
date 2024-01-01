import {AnchorHTMLAttributes} from "react";
import Link from "next/link";
import Image from "next/image";

function Logo(props:AnchorHTMLAttributes<HTMLAnchorElement>) {

    return (
        <Link href={"/"} {...props}>
            <Image src={"/icons/logo.png"} alt={"diwall-logo"} width={100} height={100}/>
        </Link>
    )
}

export default Logo;