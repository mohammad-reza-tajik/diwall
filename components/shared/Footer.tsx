import Link from "next/link";
import Image from "next/image";
import {Apple, GooglePlay, Phone, Circle} from "@/components/shared/Icons";
import {footerLinks1, footerLinks2, footerLinks3, socials} from "@/constants/footerLinks";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

function Footer() {

    return (
        <footer className={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-7 gap-y-2"}>
            <div className={"flex flex-col gap-3"}>
                <h3 className={"text-sm md:text-lg font-dana-bold"}>فروشگاه دیوال</h3>
                {
                    footerLinks1.map((link, index) => {
                        return (
                            <Link key={index}
                                  className={"flex items-center gap-2 text-xs md:text-sm hover:text-primary transition-colors"}
                                  href={link.href}>
                                <Circle className={"size-2"}/>
                                {link.text}
                            </Link>
                        )
                    })
                }
            </div>
            <div className={"flex flex-col gap-3 "}>
                <h3 className={"text-sm md:text-lg font-dana-bold"}>خدمات دیوال</h3>
                {
                    footerLinks2.map((link, index) => {
                        return (
                            <Link key={index}
                                  className={"flex items-center gap-2 text-xs md:text-sm hover:text-primary transition-colors"}
                                  href={link.href}>
                                <Circle className={"size-2"}/>
                                {link.text}
                            </Link>
                        )
                    })
                }
            </div>
            <div className={"hidden sm:flex flex-col gap-3"}>
                <h3 className={"text-sm md:text-lg font-dana-bold"}>خدمات مشتریان</h3>
                {
                    footerLinks3.map((link, index) => {
                        return (
                            <Link key={index}
                                  className={"flex items-center gap-2 text-xs md:text-sm hover:text-primary transition-colors"}
                                  href={link.href}>
                                <Circle className={"size-2"}/>
                                {link.text}
                            </Link>
                        )
                    })
                }
            </div>

            {/********************************************************************************/}

            <div className={"flex flex-col gap-5 max-lg:col-span-full my-5"}>
                <h3 className={"text-sm md:text-base font-dana-bold"}>
                    دیوال را دنبال کنید
                </h3>
                <div className={"flex items-center gap-2"}>
                    {
                        socials.map((social) => {
                            return (
                                <Button asChild key={social.href} variant={"ghost"} size={"icon"}>
                                    <a href={social.href} aria-label={social.label}>
                                        {social.icon}
                                    </a>
                                </Button>
                            )
                        })
                    }
                </div>
                <p className={"text-sm md:text-base"}>
                    از جدیدترین تخفیفات
                    &nbsp;
                    <span className={"text-primary"}>
                            دیوال
                        </span>
                    &nbsp;
                    با خبر شوید!
                </p>
            </div>

            <div className={"items-center justify-between my-7 hidden md:flex col-span-full"}>
                <div className={"flex flex-col gap-2"}>
                    <h4 className={"font-dana-bold text-xl"}>
                        الو
                        &nbsp;
                        <span className={"text-primary"}>
                            دیوال
                        </span>
                    </h4>
                    <p>
                        24 ساعت در هفت روز هفته آماده خدمت رسانی به مشتریان هستیم
                    </p>
                </div>
                <div className={"flex"}>
                    <div className={"flex flex-col"}>
                        <span className={"text-base font-dana-bold"}>021464879</span>
                        <span className={"text-sm text-center"}>پشتیبانی</span>
                    </div>
                    <div className={"flex justify-center items-center"}>
                        <Phone className={"fill-primary size-8"}/>
                    </div>
                </div>
            </div>

            <div className={"flex max-lg:flex-col justify-between items-center gap-2 col-span-full"}>
                <div className={"flex flex-col gap-2 lg:flex-1"}>
                    <h4 className={"text-sm md:text-lg font-dana-bold"}>
                        فروشگاه اینترنتی
                        &nbsp;
                        <span className={"text-primary"}>
                        دیوال
                        </span>
                    </h4>
                    <p className={"text-xs md:text-sm !leading-7"}>
                        پوستر دیواری الگوی بسیار مناسبی از یک متریال ایده آل و
                        پرکاربرد در
                        دکوراسیون
                        داخلی بوده که توانسته با
                        طیف وسیعی از طرح ها و رنگ های متنوع امروزه به عنوان یکی از محصولات پر طرفدار در امر تزئینات
                        دکوراسیون داخلی قرار گیرد. برترین ویژگی پوستر کاغذ دیواری انعطاف در چاپ طرح های خاص و بر
                        آورده
                        کردن
                        خواسته ها و هماهنگی با رنگ و آیتم های استفاده شده در دکوراسیون داخلی می باشد. پوستر دیواری
                        توانسته
                        با طرح های متنوع میزبان خوبی برای خانه های ما باشد تصاویری که برگرفته از پوستر های دیواری سه
                        بعدی ،
                        پوستر های دیواری مدرن ، پوستر های دیواری برای کسب و کار های مختلف مانند فست فود ، رستوران ،
                        مزون
                        و
                        آرایشگاه ها و مواردی از این جمله باشد. با انتخاب طرح ها در ابعاد مختلف و مقایسه قیمت ،
                        امکانی
                        برای
                        خرید برای شما فراهم می گردد تا ما بتوانیم خدمت ویژه خود را برای شما عزیزان فراهم کنیم.
                    </p>
                </div>
                <div className={"flex items-center gap-2"}>
                    <Image src={"/pictures/enamad.png"} alt={"نماد اعتماد الکترونیکی"} width={150}
                           height={150} className="object-cover"/>
                    <Image src={"/pictures/national-digital-media-badge.png"}
                           alt={"نشان ملی ثبت رسانه های دیجیتال"} width={150} height={150} className="object-cover"/>
                </div>
            </div>

            {/*****************************************************************************************/}

            <Separator className={"col-span-full my-5"} />

            <div className={"flex items-center justify-center col-span-full gap-2"}>
                <h3 className={"text-xs md:text-base"}>
                    دانلود اپلیکیشن دیوال :
                </h3>

                <div className={"flex gap-2"}>
                    <Button variant={"outline"} size={"icon"} aria-label={"دریافت اپلیکیشن از google play"}>
                        <GooglePlay className={"md:size-5 size-4"}/>
                    </Button>
                    <Button variant={"outline"} size={"icon"} aria-label={"دریافت اپلیکیشن از play store"}>
                        <Apple className={"md:size-5 size-4"}/>
                    </Button>
                </div>
            </div>


            <Separator className={"col-span-full my-5"} />

            <h4 className={"text-center my-4 text-xs md:text-sm col-span-full"}>
                تمامی حقوق مادی و معنوی این سایت متعلق به دیوال می باشد و هر گونه کپی برداری پیگرد قانونی خواهد
                داشت
                .
            </h4>

        </footer>
    )
}

export default Footer