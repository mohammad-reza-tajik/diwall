import Link from "next/link";
import Image from "next/image";

function BannerMobile ()  {
    return (
        <div className={"flex justify-center md:hidden mb-10 relative w-screen h-[80vh]"}>
            <div className={"flex flex-col justify-center items-center px-2 gap-5 z-20 bg-black/60"}>
                <h1 className={"text-white text-center font-dana-black text-2xl"}>
                    خانه رویایی خود را به واقعیت تبدیل کنید
                </h1>
                <p className={"text-white text-center text-base sm:text-lg leading-10"}>
                    از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                    آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                </p>
                <Link className={"btn btn-primary rounded-full w-max"} aria-label="مشاهده محصولات" href={"/products"}>
                    مشاهده محصولات
                </Link>
            </div>
            <Image src={"/pictures/banner-mobile.jpg"} alt={"banner"} fill priority className={"object-cover"}/>
        </div>
    );
}

export default BannerMobile;