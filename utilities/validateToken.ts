import jwt from "jsonwebtoken";


const validateToken =  (token : string) => {
    try {
        jwt.verify(token, "TheLanternIsTooBright")
        return true
    } catch (e) {
        return false
    }
}

export default validateToken