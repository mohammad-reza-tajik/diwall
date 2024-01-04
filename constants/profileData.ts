import {UserType} from "@/db/userModel";

const profileData = (user : UserType) => [
    {
        key:"نام و نام خانوادگی: ",
        value:"مشخص نشده !"
    },{
        key:"نام کاربری : ",
        value: user.username
    },{
        key:"ایمیل : ",
        value:user.email
    },{
        key:"شماره موبایل : ",
        value:"مشخص نشده !"
    },{
        key:" تاریخ تولد : ",
        value:"مشخص نشده !"
    },{
        key:" شغل : ",
        value:"مشخص نشده !"
    },
]

export default profileData;