import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

function BannerDesktop() {
    return (
        <div className={"hidden md:grid grid-cols-6 mb-10 px-1"}>
            <div className={"flex flex-col justify-center gap-8 lg:gap-12 py-4 lg:py-8 bg-primary text-primary-foreground col-span-2 px-5"}>
                <h1 className={"text-base lg:text-xl font-dana-black"}>
                    خانه رویایی خود را به واقعیت تبدیل کنید
                </h1>
                <p className={"text-justify text-xs lg:text-sm xl:text-base lg:leading-7!"}>
                    از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                    آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                </p>
                <Button variant={"outline"} asChild>
                    <Link href={"/products"}>
                        مشاهده محصولات
                    </Link>
                </Button>
            </div>
            <Image src={"/pictures/banner-desktop.jpg"} width={750} height={500}
                   className={"w-full h-full object-cover col-span-4"} priority alt={"banner-image"}/>
        </div>
    )
}

export default BannerDesktop