"use client"
import {Create} from "@/components/shared/Icons";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import Logo from "@/components/shared/Logo";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {signupFields} from "@/constants/authFields";
import useAuth from "@/hooks/useAuth";

function SignupForm() {

    const {form,submitHandler} = useAuth("signup");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}
                  className={"bg-white p-6 h-full flex flex-col items-center gap-3 rounded"}>
                <Logo/>
                {signupFields.map((item) => {
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
                                        <FormMessage/>
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
                            <Create className={"size-6 fill-white"}/>
                    }
                    ثبت نام
                </Button>
            </form>
        </Form>
    )
}

export default SignupForm;