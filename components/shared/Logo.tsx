import {AnchorHTMLAttributes} from "react";
import Link from "next/link";
import Image from "next/image";

function Logo(props:AnchorHTMLAttributes<HTMLAnchorElement>) {

    return (
        <Link href={"/"} {...props} aria-label={"لوگو"}>
            <Image src={"/icons/logo-192.png"} alt={"لوگوی دیوال"} width={100} height={100}/>
        </Link>
    )
}

export default Logo;