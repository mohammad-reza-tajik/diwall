import {HeartOutlined, Person, ShoppingBag} from "@/components/shared/Icons";
import type {User} from "@/types/user";

const profileData = (user : User) => [
    {
        href:`${user?._id}?tab=0`,
        icon:<Person className={"fill-primary size-5"}/>,
        text:"حساب کاربری"
    },{
        href:`${user?._id}?tab=1`,
        icon: <HeartOutlined className={"fill-primary size-5"}/>,
        text:"لیست علاقمندی ها"
    },{
        href:`${user?._id}?tab=2`,
        icon:<ShoppingBag className={"fill-primary size-5"}/>,
        text:"سبد خرید"
    }
]

export default profileData;