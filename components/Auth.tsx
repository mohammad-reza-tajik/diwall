import React, {Fragment, useEffect} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "../store"
import axios from "axios"
import {useRouter} from "next/router";

interface Props {
    children: React.ReactNode;
}

const Auth: React.FC<Props> = ({children}) => {


    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {

            if (typeof window !== 'undefined') {
                const token = localStorage.getItem("token")
                const userId = localStorage.getItem("userId")
                if (userId && userId !== "undefined" && !router.pathname.includes("profile") ) {
                    axios.post("/api/get-user", {userId, token}).then(res => {
                            dispatch(userActions.login(res.data.user))
                        }
                    ).catch(_ => {
                            localStorage.clear()
                            dispatch(userActions.logout())
                        }
                    )

                }
            }

    }, [dispatch])


    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Auth