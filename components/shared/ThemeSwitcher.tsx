"use client"
import type {ButtonHTMLAttributes} from "react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "@/components/shared/Icons";

function ThemeSwitcher(props: ButtonHTMLAttributes<HTMLButtonElement>) {

    const {theme,setTheme} = useTheme();

    const switchThemeHandler = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    return (
        <Button size={"icon"} variant={"outline"} {...props} onClick={switchThemeHandler} aria-label={"تغییر تم سایت"}>
            <Sun  className={"hidden dark:inline-block"}/>
            <Moon className={"inline-block dark:hidden"}/>
        </Button>
    )
}

export default ThemeSwitcher;