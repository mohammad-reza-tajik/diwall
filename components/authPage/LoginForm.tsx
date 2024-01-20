"use client"
import {Login} from "@/components/shared/Icons";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import Logo from "@/components/shared/Logo";
import {loginFields} from "@/constants/authFields";
import useAuth from "@/hooks/useAuth";


function LoginForm() {

    const {form , submitHandler} = useAuth("login");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}
                  className={"bg-white p-6 h-full flex flex-col items-center gap-3 rounded"}>
                <Logo/>
                {loginFields.map((item) => {
                    return (
                        <FormField
                            key={item.name}
                            control={form.control}
                            name={item.name}
                            render={({field}) => {
                                return (
                                    <FormItem className="w-full">
                                        <div className={"flex items-center"}>
                                            <FormLabel className={"h-full border rounded-s-lg"}>
                                                {item.icon}
                                            </FormLabel>
                                            <FormControl className={""}>
                                                <Input {...field}
                                                       className={"py-5 rounded-s-none focus:border-primary"}
                                                       type={item.type}
                                                       placeholder={item.placeholder}/>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )
                            }}
                        />
                    )
                })}

                <Button className={"gap-2 w-full"} size={"lg"} type={"submit"} disabled={form.formState.isSubmitting}>
                    {
                        form.formState.isSubmitting ?
                            <Loader className={"border-white size-6"}/> :
                            <Login className={"size-6 fill-white"}/>
                    }
                    ورود
                </Button>
                <Link className={"text-primary text-xs"}
                      href={"/forgot-password"}>
                    رمز عبور خود را فراموش کرده ام
                </Link>
            </form>
        </Form>
    )
}

export default LoginForm;