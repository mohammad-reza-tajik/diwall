import {Person, Password, Email} from "@/components/shared/Icons";


export const loginFields = [
    {
        name: "identifier",
        icon : <Person className={"fill-primary size-10 p-2"}/>,
        type:"text",
        placeholder:"ایمیل یا نام کاربری"

    },
    {
        name: "password",
        icon : <Password className={"fill-primary size-10 p-2"}/>,
        type:"password",
        placeholder:"رمز ورود"

    }
] as const

export const signupFields = [
    {
        name: "username",
        icon : <Person className={"fill-primary size-10 p-2"}/>,
        type:"text",
        placeholder:"نام کاربری"

    },
    {
        name: "email",
        icon : <Email className={"fill-primary size-10 p-2"}/>,
        type:"email",
        placeholder:"ایمیل"

    },
    {
        name: "password",
        icon : <Password className={"fill-primary size-10 p-2"}/>,
        type:"password",
        placeholder:"رمز ورود"

    }
] as const