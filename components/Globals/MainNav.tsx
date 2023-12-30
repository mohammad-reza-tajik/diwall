import Link from "next/link";
import PhoneIcon from '@mui/icons-material/Phone';
import navLinks from "@/constants/navLinks";

function MainNav() {

    return (
        <div className={"hidden md:flex justify-between"}>
            <nav className={"flex items-center gap-10 md:text-xl lg:text-2xl"}>
                {
                    navLinks.map((link , index) => (
                        <Link key={index} href={link.href} className={"flex items-center gap-2 hover:text-primary transition-colors"}>
                            <link.icon />
                            {link.label}
                        </Link>
                        )
                    )
                }
            </nav>
            <div className={"hidden lg:flex"}>
                <div className={"flex flex-col"}>
                    <span className={"text-2xl font-dana-bold"}>021464879</span>
                    <span className={"text-xl text-center"}>پشتیبانی</span>
                </div>
                <div className={"flex justify-center items-center"}>
                    <PhoneIcon sx={{fontSize: 30}} color={"primary"}/>
                </div>
            </div>
        </div>
    )
}

export default MainNav