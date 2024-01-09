import {Home, Flame, Info, Handshake, Tag, HeartOutlined} from "@/components/shared/Icons";

const navLinks = [
    {
        text : "صفحه نخست",
        href : "/",
        icon : <Home className={"size-5"} />
    },
    {
        text : "جدیدترین ها",
        href : "/products?sortBy=جدیدترین",
        icon : <Flame className={"size-5"} />
    },
    {
        text : "پرفروش ترین ها",
        href : "/products?sortBy=پرفروش-ترین",
        icon : <Tag className={"size-5"} />
    },
    {
        text : "محبوب ترین ها",
        href : "/products?sortBy=محبوب-ترین",
        icon : <HeartOutlined className={"size-5"} />
    },
    {
        text : "درباره ما",
        href : "/about",
        icon : <Info className={"size-5"} />
    },
    {
        text : "همکاری با ما",
        href : "/collaboration",
        icon : <Handshake className={"size-5"} />
    },
];
export default navLinks;