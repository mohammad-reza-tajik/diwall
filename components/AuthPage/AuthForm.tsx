"use client"
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Logo from "@/components/Globals/Logo";
import {Create, Email, Login, Password, Person} from "@/components/Globals/Icons";

function AuthForm() {

    const {
        formType,
        setFormType,
        formHandler,
        isLoading,
        identifierRef,
        usernameRef,
        emailRef,
        passwordRef
    } = useAuth()


    return (
        <div className={"flex flex-col bg-white items-center w-screen h-screen overflow-hidden rounded md:size-[500px] gap-4"}>
            <div className="join w-full">
                <button type={"button"}
                        className={`btn no-animation ${formType === "login" && "btn-primary"} w-1/2 rounded-none`}
                        onClick={() => setFormType("login")}>ورود
                </button>
                <button type={"button"}
                        className={`btn no-animation ${formType === "signup" && "btn-primary"} w-1/2 rounded-none`}
                        onClick={() => setFormType("signup")}>ثبت نام
                </button>
            </div>

            <Logo/>
            <form className={"flex flex-col gap-4 items-center w-full px-3 md:px-10"} onSubmit={formHandler}>
                {
                    formType === "signup" ?
                        <>
                            <div className="join items-center justify-center w-full">
                                <Person className={"fill-primary size-12 p-2 join-item rounded-s-full border h-full"}/>
                                <input ref={usernameRef}
                                       className="input input-bordered rounded-e-full w-full focus:input-primary join-item"
                                       required
                                       type={"text"}
                                       placeholder={"نام کاربری"}/>
                            </div>
                            <div className="join items-center justify-center w-full">
                                <Email className={"fill-primary size-12 p-2 join-item rounded-s-full border h-full"}/>
                                <input ref={emailRef}
                                       className="input input-bordered rounded-e-full w-full focus:input-primary join-item"
                                       required
                                       type={"text"}
                                       placeholder={"ایمیل"}/>
                            </div>
                        </> :

                        <div className="join items-center justify-center w-full">
                            <Person className={"fill-primary size-12 p-2 join-item rounded-s-full border h-full"}/>
                            <input ref={passwordRef}
                                   className="input input-bordered rounded-e-full w-full focus:input-primary join-item"
                                   required type={"text"}
                                   placeholder={"ایمیل یا نام کاربری"}/>
                        </div>
                }
                <div className="join items-center justify-center w-full">
                    <Password className={"fill-primary size-12 p-2 join-item rounded-s-full border h-full"}/>
                    <input ref={identifierRef}
                           className="input input-bordered rounded-e-full w-full focus:input-primary join-item" required
                           type={"password"}
                           placeholder={"رمز ورود"}/>
                </div>
                <button className={"btn btn-primary w-full rounded-full"} type={"submit"} disabled={isLoading}>
                    {
                        isLoading ?
                            <span className={"loading loading-spinner text-white"}></span> : formType === "signup" ?
                                <Create className={"size-6 md:size-8 fill-white"}/> :
                                <Login className={"size-6 md:size-8 fill-white"}/>
                    }
                    {formType === "signup" ? "ثبت نام" : "ورود"}
                </button>


                {
                    formType === "login" ?
                        <Link className={"text-primary text-xs"} href={"/forgot-password"}>
                            رمز عبور خود را فراموش کرده ام ؟
                        </Link>
                        : null

                }
            </form>
        </div>
    )
}

export default AuthForm