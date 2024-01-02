import AuthForm from "@/components/AuthPage/AuthForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title : "ورود/ثبت نام"
}

function AuthPage() {

    return (
        <div className={"fixed inset-0 bg-auth-pattern bg-no-repeat bg-cover flex justify-center items-center z-20"}>
            <AuthForm/>
        </div>
    )
}

export default AuthPage