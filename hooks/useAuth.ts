import {useRef, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {userActions, useAppDispatch} from "../store";
// import ObjectStore from "../utilities/idb";
// import useFetch from "./useFetch";

const useAuth = () => {

    const [message, setMessage] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [typeOfForm, setTypeOfForm] = useState("login");
    const [isLoading, setIsLoading] = useState(false)



    const router = useRouter()




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




    //********************************* form submission **********************************!//


    const formHandler = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            setMessage("");


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


            /*if ("serviceWorker" in navigator) {
                const sw = await navigator.serviceWorker.ready;
                const authStore = new ObjectStore("sync-auth");
                await authStore.saveToIDB("user", user);
                await sw.sync.register("sync-auth");
                console.log("this is after sending sync-auth in useAuth")
            } else {*/
                const res = await axios.post(`/api/${typeOfForm === "signup" ? "signup" : "login"}`, user)
                setMessage(res.data.message)
                dispatch(userActions.login(res.data.user))
                openSnackbarHandler()
                router.push("/");

            // }


        } catch (err) {
            console.log(err)
            setMessage(err?.response.data.message)
            openSnackbarHandler()

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
        closeSnackbarHandler,
        passwordRef,
        message,
        openSnackbar,
        typeOfForm
    }

}

export default useAuth;