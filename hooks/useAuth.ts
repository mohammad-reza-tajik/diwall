import {FormEvent, useRef, useState} from "react";
import {useRouter} from "next/router";
import {userActions, useAppDispatch, snackbarActions} from "@/store";
import useFetch from "@/hooks/useFetch";

const useAuth = () => {

    const [typeOfForm, setTypeOfForm] = useState<"login" | "signup">("login");
    const [isLoading, setIsLoading] = useState(false)


    const router = useRouter()


    const dispatch = useAppDispatch()

    const typeOfFormHandler = (_, typeOfForm) => {
        // the bottom line is written like this so that only one tab can be active or disabled at a time
        if (typeOfForm !== null)
            setTypeOfForm(typeOfForm);
    }

    //********************************** form field refs **********************************//

    const usernameRef = useRef<HTMLInputElement>()
    const emailRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const usernameOrEmailRef = useRef<HTMLInputElement>()


    //********************************* form submission **********************************!//


    const formHandler = async (event : FormEvent) => {
        try {
            event.preventDefault()
            setIsLoading(true)


            const user = typeOfForm === "signup" ?
                {
                    username: usernameRef.current?.value,
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                } :
                {
                    usernameOrEmail: usernameOrEmailRef.current?.value,
                    password: passwordRef.current?.value

                }

            const res = await useFetch.post(`/api/${typeOfForm === "signup" ? "signup" : "login"}`, user)
            dispatch(userActions.login({user : res.user , token : res.token}))
            dispatch(snackbarActions.openSnackbar({message: res.message, status: "success"}));

            router.push("/");



        } catch (err) {
            dispatch(snackbarActions.openSnackbar({message: err?.response.data.message, status: "error"}))


        } finally {
            setIsLoading(false)
        }


    }

    return {
        isLoading,
        emailRef,
        usernameOrEmailRef,
        usernameRef,
        formHandler,
        typeOfFormHandler,
        passwordRef,
        typeOfForm
    }

}

export default useAuth;