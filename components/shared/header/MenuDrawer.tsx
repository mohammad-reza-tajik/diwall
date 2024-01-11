"use client"
import {useRouter} from "next/navigation";
import Logo from "@/components/shared/Logo";
import navLinks from "@/constants/navLinks";

interface Props {
    setOpenMenuDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    openMenuDrawer: boolean;

}

function MenuDrawer({openMenuDrawer, setOpenMenuDrawer}: Props) {

    const router = useRouter();

    const menuItemsHandler = (url: string) => {
        setOpenMenuDrawer(false);
        router.push(url);
    }

    return (
        <div className="relative">
            {openMenuDrawer && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
                     onClick={() => setOpenMenuDrawer(false)}></div>
            )}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 flex flex-col gap-2 p-5 bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300 ${openMenuDrawer ? "translate-x-0" : "translate-x-full"}`}>
                    <Logo onClick={() => menuItemsHandler("/")} className={"size-20 sm:size-36"}/>
                    {
                        navLinks.map((link, index) => {
                            return (
                                <button onClick={() => menuItemsHandler(link.href)} key={index}
                                        className={"flex items-center text-xs sm:text-sm gap-3 hover:bg-black/5 border-b p-2 sm:p-4 hover:fill-primary transition-colors"}>
                                    {link.icon}
                                    {link.text}
                                </button>
                            )
                        })
                    }
            </div>
        </div>


    )

}

export default MenuDrawer;
