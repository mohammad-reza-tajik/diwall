import Link from "next/link";
import navLinks from "@/constants/navLinks";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";

function MainNav() {

    return (
        <div className={"hidden md:flex justify-between my-5"}>
            <nav className={"flex items-center gap-6 text-sm lg:text-base"}>
                {
                    navLinks.map((link, index) => (
                            <Link key={index} href={link.href}
                                  className={"flex items-center gap-1 text-xs lg:text-base hover:text-primary hover:fill-primary transition-colors"}>
                                {link.icon}
                                {link.text}
                            </Link>
                        )
                    )
                }
            </nav>
            <ThemeSwitcher/>
        </div>
    )
}

export default MainNav