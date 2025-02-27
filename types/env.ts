import {z} from "zod";

const regExp = /^\d+(\s?(Years?|Yrs?|Y|Weeks?|W|Days?|D|Hours?|Hrs?|H|Minutes?|Mins?|M|Seconds?|Secs?|s|Milliseconds?|Msecs?|Ms))?$/i;


const envSchema = z.object({
    MONGODB_URL : z.string(),
    JWT_SECRET : z.string(),
    JWT_EXPIRES_IN : z.string().regex(regExp),

})


envSchema.parse(process.env);
console.log(process.env.JWT_EXPIRES_IN.match(regExp))

declare global {
    namespace NodeJS{
        interface ProcessEnv extends z.infer<typeof envSchema>{}
    }
}