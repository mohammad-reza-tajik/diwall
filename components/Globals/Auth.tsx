import React, {Fragment, useEffect} from "react";
import {userActions , useAppDispatch} from "@/store"
import axios from "axios"
import {useRouter} from "next/router";

interface Props {
    children: React.ReactNode;
}

const Auth: React.FC<Props> = ({children}) => {


    const dispatch = useAppDispatch()
    const router = useRouter();

    useEffect(() => {

        /* useEffect always executes on client side */

        (async () => {

            try {

                const token = localStorage.getItem("token")
                const _id = localStorage.getItem("_id")
                if (_id && _id !== "undefined") {
                    const res = await axios.post("/api/get-user", {_id, token});
                    // console.log(res)
                    dispatch(userActions.login({user : res.user , token : res.token}))
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