import jwt from "jsonwebtoken"


export const IdGenerator = function () {
    return (Math.random() + Math.random()).toString(16).slice(2) +
        (Math.random() + Math.random()).toString(36).slice(2) +
        new Date().getTime().toString(36);
}


export const generateToken = (user) => {
    return jwt.sign({userId: user._id}, "thisIsPrivate", {expiresIn: "2 days"})
}

export const storeTokenAndUser = (user) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("userId", user.userId)
        localStorage.setItem("username", user.username)
        localStorage.setItem("token", user.token)
    }
}



export const validateToken = async (token) => {
    try {
        await jwt.verify(token, "thisIsPrivate")
        return true
    } catch (e) {
        console.error("your token has been expired !")
        return false
    }
}


export const removeToken = () => {
    if (typeof window !== 'undefined')
        localStorage.clear()
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


