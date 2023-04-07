import React, {Fragment, useEffect} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "../../store"
import axios from "axios"
import {useRouter} from "next/router";

interface Props {
    children: React.ReactNode;
}

const Auth: React.FC<Props> = ({children}) => {


    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {

        /* useEffect always executes on client side */

        (async () => {

            try {

                const token = localStorage.getItem("token")
                const userId = localStorage.getItem("userId")
                if (userId && userId !== "undefined" && !router.pathname.includes("user") ) {
                    const res = await axios.post("/api/get-user", {userId, token})
                    dispatch(userActions.login(res.data.user))
                }
             } catch(err) {
                    localStorage.clear()
                    dispatch(userActions.logout())
                    console.log(err)
                }
                
                
            
        })()
            

    }, [dispatch])


    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Auth