import {FormEvent, useRef, useState} from "react";
import {useRouter} from "next/router";
import {userActions, useAppDispatch} from "@/store";
import fetcher from "@/utils/fetcher";
import {enqueueSnackbar} from "notistack";

const useAuth = () => {

    const [formType, setFormType] = useState<"login" | "signup">("login");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const dispatch = useAppDispatch();

    const formTypeHandler = (_, formType : "login" | "signup") => {
        // the bottom line is written like this so that only one tab can be active or disabled at a time
        if (formType !== null)
            setFormType(formType);
    }

    //********************************** form field refs **********************************//

    const usernameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const usernameOrEmailRef = useRef<HTMLInputElement>();


    //********************************* form submission **********************************!//


    const formHandler = async (event : FormEvent) => {
        try {
            event.preventDefault();
            setIsLoading(true);

            const user = formType === "signup" ?
                {
                    username: usernameRef.current?.value,
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                } :
                {
                    usernameOrEmail: usernameOrEmailRef.current?.value,
                    password: passwordRef.current?.value

                }

            const res = await fetcher.post(`/api/user/${formType === "signup" ? "signup" : "login"}`, user);

            if ( !res.ok) {
                throw new Error(res.message);
            }

            /** clearing fields **/
            if (formType === "login") {
                usernameOrEmailRef.current.value = "";
            } else {
                usernameRef.current.value="";
                emailRef.current.value="";
            }
            passwordRef.current.value="";

            dispatch(userActions.login({user : res.user , token : res.token}));
            enqueueSnackbar(res.message , {
                variant : "success",
            });

            router.push("/");

        } catch (err) {
            enqueueSnackbar(err.message , {
                variant : "error",
            })

        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        emailRef,
        usernameOrEmailRef,
        usernameRef,
        formHandler,
        formTypeHandler,
        passwordRef,
        formType
    }

}

export default useAuth;