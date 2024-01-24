import {useRouter} from "next/navigation";
import {userActions, useAppDispatch} from "@/store";
import {login, signup} from "@/actions/user/auth";
import {SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, type LoginSchema, signupSchema, type SignupSchema} from "@/types/user";
import {zodResolver} from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const useAuth = (formType: "login" | "signup" = "login") => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const form = useForm<LoginSchema | SignupSchema>({
        resolver: zodResolver(formType === "login" ? loginSchema : signupSchema),
        defaultValues: {
            identifier: "",
            username: "",
            email: "",
            password: "",
        }
    });

    const submitHandler: SubmitHandler<LoginSchema | SignupSchema> = async (data) => {
        try {
            let res: any;

            if (formType === "signup") {
                res = await signup(signupSchema.parse(data));
            } else {
                res = await login(loginSchema.parse(data));
            }

            if (!res.ok) {
                throw new Error(res.message);
            }

            form.reset();

            dispatch(userActions.login(res.user));
            Cookies.set("token",res.token);
            toast.success(res.message);

            router.push("/");
        } catch (err : any) {
            toast.error(err.message);
        }
    }

    return {submitHandler,form}

}

export default useAuth;