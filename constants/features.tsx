import {Package , Medal , Shipping , HeadPhones} from "@/components/Globals/Icons";

const features = [
    {
        title : "ارسال رایگان",
        description : "ارسال رایگان به تمام نقاط ایران",
        icon : <Shipping className={"size-10 fill-primary"} />
    },
    {
        title : "بسته بندی رایگان",
        description : "بسته بندی امن برای حفاظت فیزیکی",
        icon : <Package className={"size-10 fill-primary"} />
    },
    {
        title : "تضمین کیفیت",
        description : "تضمین کیفیت و گارانتی محصولات",
        icon : <Medal className={"size-10  fill-primary"} />
    },
    {
        title : "پشتیبانی آنلاین",
        description : "پشتیبانی به صورت شبانه روزی",
        icon : <HeadPhones className={"size-10 fill-primary"} />
    }
]

export default features;