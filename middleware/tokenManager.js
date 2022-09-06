import jwt from "jsonwebtoken"
import axios from "axios";

export const generateToken = (user) => {
    return jwt.sign({userId: user._id}, "thisIsPrivate", {expiresIn: "1h"})
}

export const storeTokenAndUser = (user) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("userId", user.userId)
        localStorage.setItem("username", user.username)
        localStorage.setItem("token", user.token)
    }
}

// export const getStoredToken = () => {
//     if (typeof window !== 'undefined') {
//         const token = localStorage.getItem("token")
//         const userId = localStorage.getItem("userId")
//         console.log(userId)
//
//         let user;
//         // const username = localStorage.getItem("username")
//         if (userId) {
//
//             user =axios.post("/api/get-user", {userId, token}).then(res => {
//             // axios.post("/api/get-user", {userId, token}).then(res => {
//                 return res.data.user
//
//                     // user = res.data
//                     // console.log(res)
//                 }
//             ).catch(e => console.log(e))
//
//         } else {
//             user = undefined
//
//         }
//
//     return user
//     }
// }

export const validateToken = (token) => {
    return jwt.verify(token, "thisIsPrivate")
}


export const removeToken = () => {
    if (typeof window !== 'undefined')
        localStorage.clear()
}

