import Image from "next/image"
import Link from "next/link";
import {Metadata} from "next";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
    title: " صفحه مورد نظر پیدا نشد"
}

function NotFound() {

    return (
        <section
            className={"flex flex-col md:justify-center items-center w-screen h-screen fixed inset-0 z-50 bg-background gap-5"}>
            <Image src={"/pictures/not-found.svg"} width={400} height={400} className={"w-80 h-auto"}
                   alt={"صفحه مورد نظر شما یافت نشد !"}/>
            <h1 className={"font-dana-black text-lg md:text-2xl text-center"}>
                صفحه مورد نظر پیدا نشد
            </h1>
            <p className={"text-sm md:text-base px-5 text-center"}>
                آدرس صفحه اشتباه است یا سایت با مشکل مواجه شده است
            </p>
            <Button asChild>
                <Link href={"/"}>
                    بازگشت به صفحه اصلی
                </Link>
            </Button>
        </section>
    )
}

export default NotFound