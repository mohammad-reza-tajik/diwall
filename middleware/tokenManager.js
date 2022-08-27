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

export const getTokenAndUser = () => {
    if (typeof window !== 'undefined') {
        localStorage.getItem("userId")
        localStorage.getItem("username")
        localStorage.getItem("token")
    }

}

export const validateToken = (token) => {

}

export const removeToken = () => {
    if (typeof window !== 'undefined')
         localStorage.clear()
}
