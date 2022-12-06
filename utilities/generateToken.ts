import jwt from "jsonwebtoken"

const generateToken = (user) => {
    return jwt.sign({userId: user._id}, "thisIsPrivate", {expiresIn: "2 days"})
}

export default generateToken

