import Link from "next/link";
import navLinks from "@/constants/navLinks";
import {Phone} from "@/components/shared/Icons";

function MainNav() {

    return (
        <div className={"hidden md:flex justify-between my-5"}>
            <nav className={"flex items-center gap-6 text-sm lg:text-base"}>
                {
                    navLinks.map((link , index) => (
                        <Link key={index} href={link.href} className={"flex items-center gap-1 hover:text-primary hover:fill-primary transition-colors"}>
                            {link.icon}
                            {link.text}
                        </Link>
                        )
                    )
                }
            </nav>
            <div className={"hidden lg:flex"}>
                <div className={"flex flex-col"}>
                    <span className={"text-base font-dana-bold"}>021464879</span>
                    <span className={"text-sm text-center"}>پشتیبانی</span>
                </div>
                <div className={"flex justify-center items-center"}>
                    <Phone className={"fill-primary size-8"} />
                </div>
            </div>
        </div>
    )
}

export default MainNav