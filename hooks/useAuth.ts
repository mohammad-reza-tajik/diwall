import {useRef, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {userActions , useAppDispatch} from "../store";

const useAuth = () => {

    const [message, setMessage] = useState<string>("")
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [typeOfForm, setTypeOfForm] = useState<string>("signIn")


    const dispatch = useAppDispatch()

    const openSnackbarHandler = () => {
        setOpenSnackbar(true)

    }

    const closeSnackbarHandler = () => {
        setOpenSnackbar(false)
    }

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


    const router = useRouter()


    const [isLoading, setIsLoading] = useState<boolean>(false)


    //********************************* form submission **********************************!//


    const formHandler = async (e) => {
        try {
        e.preventDefault()
        setIsLoading(true)
        setMessage("")

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

        const res = await axios.post(`/api/${typeOfForm === "signup" ? "signup" : "sign-in"}`, user)


                setMessage(res.data.message)
                dispatch(userActions.login(res.data.user))

                setIsLoading(false)
                openSnackbarHandler()
                router.push("/")

        } catch (err) {
            console.log(err)
            setMessage(err?.response.data.message)
            setIsLoading(false)
            openSnackbarHandler()

        }





    }

    return {
        isLoading,
        emailRef,
        usernameOrEmailRef,
        usernameRef,
        formHandler,
        typeOfFormHandler,
        closeSnackbarHandler,
        passwordRef,
        message,
        openSnackbar,
        typeOfForm
    }

}

export default useAuth;