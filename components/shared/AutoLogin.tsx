"use client"
import {userActions, useAppDispatch} from "@/store";
import {useEffect} from "react";
import {getUser} from "@/actions/user/auth";

interface Props {
    children: React.ReactNode
}

function AutoLogin({children}: Props) {

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            try {
                const res = await getUser();
                if (!res) return
                dispatch(userActions.login(res.user));

            } catch (err) {
                dispatch(userActions.logout());
            }
        })();
    }, [dispatch]);

    return (
        <>
            {children}
        </>
    )
}

export default AutoLogin