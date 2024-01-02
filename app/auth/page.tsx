import AuthForm from "@/components/AuthPage/AuthForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title : "ورود/ثبت نام"
}

function AuthPage() {

    return (
        <div className={"fixed inset-0 bg-gradient-to-bl from-primary via-green-400 to-primary flex justify-center items-center z-20"}>
            <AuthForm/>
        </div>
    )
}

export default AuthPage