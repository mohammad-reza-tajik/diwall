import jwt from "jsonwebtoken"


const validateToken = async (token) => {
    try {
        await jwt.verify(token, "thisIsPrivate")
        return true
    } catch (e) {
        console.error("your token has been expired !")
        return false
    }
}

export default validateToken