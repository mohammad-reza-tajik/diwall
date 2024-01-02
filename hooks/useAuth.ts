import {FormEvent, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {userActions, useAppDispatch} from "@/store";
import {login, signup} from "@/actions/user/auth";
import {enqueueSnackbar} from "notistack";

const useAuth = () => {

    const [formType, setFormType] = useState<"login" | "signup">("login");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const dispatch = useAppDispatch();

    //********************************** form field refs **********************************//

    const usernameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const identifierRef = useRef<HTMLInputElement>();


    //********************************* form submission **********************************!//


    const formHandler = async (event: FormEvent) => {
        try {
            event.preventDefault();
            setIsLoading(true);

            let res: any;

            if (formType === "signup") {
                res = await signup({
                    username: usernameRef.current?.value,
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                })
            } else {
                res = await login({
                    identifier: identifierRef.current?.value,
                    password: passwordRef.current?.value
                })
            }

            if (!res.ok) {
                throw new Error(res.message);
            }

            /** clearing fields **/
            if (formType === "login") {
                identifierRef.current.value = "";
            } else {
                usernameRef.current.value = "";
                emailRef.current.value = "";
            }
            passwordRef.current.value = "";

            dispatch(userActions.login({user: res.user, token: res.token}));
            enqueueSnackbar(res.message, {
                variant: "success",
            });

            router.push("/");

        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: "error",
            })

        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        emailRef,
        identifierRef,
        usernameRef,
        formHandler,
        setFormType,
        passwordRef,
        formType
    }

}

export default useAuth;