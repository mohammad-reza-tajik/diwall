import React, {Fragment, useEffect} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "../store"
import axios from "axios";

interface Props {
    children: React.ReactNode;
}

const Auth: React.FC<Props> = ({children}) => {


    const dispatch = useDispatch()

    useEffect(() => {

        // (async () => {

            if (typeof window !== 'undefined') {
                const token = localStorage.getItem("token")
                const userId = localStorage.getItem("userId")
                if (userId && userId !== "undefined") {
                    axios.post("/api/get-user", {userId, token}).then(res => {
                            dispatch(userActions.login(res.data.user))
                        }
                    ).catch(_ => {
                            localStorage.clear()
                            dispatch(userActions.logout())
                        }
                    )
                   /* try {

                        const response = await axios.post("/api/get-user", {userId, token})
                        await dispatch(userActions.login(response.data.user))
                        console.log(response.data.user)

                    } catch (error) {
                        localStorage.clear()
                        dispatch(userActions.logout())

                    }*/

                }
            }
        // })()

    }, [dispatch])


    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Auth