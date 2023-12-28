import jwt from "jsonwebtoken";

import {promisify} from "util";

const promisifiedVerify = promisify<string, jwt.Secret>(jwt.verify);

const validateToken = async (token: string) => {
    return promisifiedVerify(token, "TheLanternIsTooBright") as unknown as Promise<unknown> as Promise<jwt.JwtPayload>;
}

export default validateToken