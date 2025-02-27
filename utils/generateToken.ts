import jwt from "jsonwebtoken";

function generateToken (id : string) {
    // @ts-ignore
    return jwt.sign({_id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

export default generateToken

