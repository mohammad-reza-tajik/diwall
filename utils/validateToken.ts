import jwt from "jsonwebtoken";

async function validateToken(token: string): Promise<string | jwt.JwtPayload | undefined> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

export default validateToken