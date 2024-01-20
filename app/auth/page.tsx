import {Metadata} from "next";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LoginForm from "@/components/authPage/LoginForm";
import SignupForm from "@/components/authPage/SignupForm";

export const metadata: Metadata = {
    title : "ورود/ثبت نام"
}

function AuthPage() {

    return (
        <div className={"fixed z-50 top-0 right-0 w-screen h-[100dvh] bg-auth-pattern bg-no-repeat bg-cover flex justify-center items-center"}>
            <Tabs defaultValue={"login"} className={"w-screen h-[100dvh] md:h-[400px] md:w-[500px]"} >
                <TabsList className={"grid w-full grid-cols-2 max-md:rounded-none"}>
                    <TabsTrigger className={"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"} value={"login"}>ورود</TabsTrigger>
                    <TabsTrigger className={"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"} value={"signup"}>ثبت نام</TabsTrigger>
                </TabsList>
                <TabsContent value={"login"} className={"h-full"}>
                    <LoginForm />
                </TabsContent>
                <TabsContent value={"signup"} className={"h-full"}>
                    <SignupForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AuthPage