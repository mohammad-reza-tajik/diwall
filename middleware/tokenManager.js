import jwt from "jsonwebtoken"
import axios from "axios";

export const generateToken = (user) => {
    return  jwt.sign({userId:user._id},"thisIsPrivate",{expiresIn: "1h"})
}

export const storeTokenAndUser = (user) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("userId",user.userId)
        localStorage.setItem("username",user.username)
        localStorage.setItem("token",user.token)
    }
}

export const getStoredToken = async () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token")

        const userId = localStorage.getItem("userId")

        let user;
        // const username = localStorage.getItem("username")
        if (userId){

            const response = await axios.post("/api/get-user",{userId,token})
            user= response.data.user
            console.log(response.data.user)

            return user

        }
        else
            return undefined

    }}

    export const validateToken = (token) => {
        return jwt.verify(token, "thisIsPrivate")
    }


    export const removeToken = () => {
        if (typeof window !== 'undefined')
            localStorage.clear()
    }

