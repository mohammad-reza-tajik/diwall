import {useRouter} from "next/navigation";
import {userActions, useAppDispatch} from "@/store";
import {login, signup} from "@/actions/user/auth";
import {enqueueSnackbar} from "notistack";
import {SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, TLoginSchema, signupSchema, TSignupSchema} from "@/types/authForms";
import {zodResolver} from "@hookform/resolvers/zod";

const useAuth = (formType: "login" | "signup" = "login") => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const form = useForm<TLoginSchema | TSignupSchema>({
        resolver: zodResolver(formType === "login" ? loginSchema : signupSchema),
        defaultValues: {
            identifier: "",
            username: "",
            email: "",
            password: "",
        }
    });

    const submitHandler: SubmitHandler<TLoginSchema | TSignupSchema> = async (data) => {
        try {
            let res: any;

            if (formType === "signup") {
                res = await signup(signupSchema.parse(data));
            } else {
                res = await login(loginSchema.parse(data))
            }

            if (!res.ok) {
                throw new Error(res.message);
            }

            form.reset();

            dispatch(userActions.login({user: res.user, token: res.token}));
            enqueueSnackbar(res.message, {
                variant: "success",
            });

            router.push("/");
        } catch (err : any) {
            enqueueSnackbar(err.message, {
                variant: "error",
            })
        }
    }

    return {submitHandler,form}

}

export default useAuth;