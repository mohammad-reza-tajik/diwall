import React, {useEffect} from "react";
import useFetch from "@/hooks/useFetch";
import {userActions , useAppDispatch} from "@/store";

interface Props {
    children : React.ReactNode
}

const AutoLogin : React.FC<Props> = ({children}) => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                const _id = localStorage.getItem("_id");
                if (_id && token) {
                    const res = await useFetch.get(`/api/user?_id=${_id}&token=${token}`);
                    dispatch(userActions.login({user: res.user, token: res.token}));
                }
            } catch (err) {
                localStorage.clear();
                dispatch(userActions.logout());
                console.log(err);
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