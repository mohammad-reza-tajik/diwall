import {Fragment, useEffect} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "../store"
import axios from "axios";

const Auth = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token")
            const userId = localStorage.getItem("userId")
            if (userId && userId !== "undefined") {
                axios.post("/api/get-user", {userId, token}).then(res => {

                        dispatch(userActions.login(res.data.user))
                        // console.log(res)

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
            {props.children}
        </Fragment>
    )
}

export default Auth