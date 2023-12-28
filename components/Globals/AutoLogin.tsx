"use client"
import {userActions, useAppDispatch} from "@/store";
import Cookies from "js-cookie";
import {useEffect} from "react";
import {getUser} from "@/actions/user/auth";

interface Props {
    children: React.ReactNode
}

function AutoLogin({children}: Props) {

    const dispatch = useAppDispatch();
    const token = Cookies.get("token");

    useEffect(() => {
        (async () => {
            try {
                if (token) {
                    const res = await getUser();
                    dispatch(userActions.login({user: res.user, token: res.token}));
                }

            } catch (err) {
                dispatch(userActions.logout());
                console.log(err);
            }

        })();
    }, [dispatch,token]);

 return (
        <>
            {children}
        </>
    )
}

export default AutoLogin