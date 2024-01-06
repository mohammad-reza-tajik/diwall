import type {Metadata, Viewport} from "next";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/free-mode";
import "swiper/scss/thumbs";
import "@/styles/Globals.scss";
import AutoLogin from "@/components/Globals/AutoLogin";
import Providers from "@/components/Globals/Providers";
import Header from "@/components/Globals/Header";
import Footer from "@/components/Globals/Footer";
import MainNav from "@/components/Globals/MainNav";


export const metadata: Metadata = {
    title: {
        default: "دیوال : فروشگاه پوستر و کاغذ دیواری",
        template: "دیوال - %s "
    },
    description: "خرید بهترین پوستر و کاغذ دیواری با قیمت مناسب",
    keywords: ["پوستر دیواری", "کاغذ دیواری", "خرید کاغذ دیواری", "خرید پوستر دیواری"],
    category: "e-commerce",
    metadataBase: new URL("https://diwall.vercel.com"),
    manifest: "/manifest.json",
    applicationName: "دیوال",
    appleWebApp: {title: "دیوال", capable: true, statusBarStyle: "default"},
    formatDetection: {telephone: false},
    openGraph: {
        title: "دیوال : فروشگاه پوستر و کاغذ دیواری",
        description: "از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید",
        url: "https://diwall.vercel.com",
        locale: 'fa_IR',
        type: 'website',
        siteName: "دیوال",
        images: {
            alt: "دیوال : فروشگاه پوستر و کاغذ دیواری",
            url: "/assets/pictures/og-banner.jpg"
        }

    },
    twitter: {
        title: "دیوال : فروشگاه پوستر و کاغذ دیواری",
        description: "از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید",
        card: "summary_large_image",
        site: "https://diwall.vercel.com",
        images: {
            alt: "دیوال : فروشگاه پوستر و کاغذ دیواری",
            url: "/assets/pictures/og-banner.jpg"
        },
    },
    icons: {
        icon: "/icons/logo-144.png",
        apple: [
            {url: "/icons/logo-144.png", sizes: "144x144", type: "image/png"},
            {url: "/icons/logo-192.png", sizes: "192x192", type: "image/png"},
        ]
    }
}

export const viewport: Viewport = {
    themeColor: "#069f69",
    width: "device-width",
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    initialScale: 1
}

interface Props {
    children: React.ReactNode;
}

function RootLayout({children}: Props) {
    return (
        <html lang="fa" dir={"rtl"}>
        <body>
        <Providers>
            <AutoLogin>
                    <main className={"contained"}>
                        <Header/>
                        <MainNav />
                        {children}
                        <Footer/>
                    </main>
            </AutoLogin>
        </Providers>
        </body>
        </html>
    )
}

export default RootLayout