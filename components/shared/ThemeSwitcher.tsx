"use client"
import type {ButtonHTMLAttributes} from "react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "@/components/shared/Icons";

function ThemeSwitcher(props: ButtonHTMLAttributes<HTMLButtonElement>) {

    const {setTheme} = useTheme();

    return (
        <Button size={"icon"} variant={"outline"} {...props}>
            <Sun onClick={() => setTheme("light")} className={"hidden dark:inline-block"}/>
            <Moon onClick={() => setTheme("dark")} className={"inline-block dark:hidden"}/>
        </Button>

    )
}

export default ThemeSwitcher;