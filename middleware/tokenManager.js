import jwt from "jsonwebtoken"

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

export const getStoredToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")
        const username = localStorage.getItem("username")
        const user = {
            token,
            username,
            userId
        }
        if (token)
            return user
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

