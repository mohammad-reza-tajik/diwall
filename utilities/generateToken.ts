import jwt from "jsonwebtoken"

const generateToken = (id : string) => {
    // console.log(id)
    return jwt.sign({_id: id}, "TheLanternIsTooBright", {expiresIn: "2 days"})
}

export default generateToken

