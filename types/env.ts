import {z} from "zod";

const envSchema = z.object({
    MONGODB_URL : z.string(),
    JWT_SECRET : z.string(),
    JWT_EXPIRES_IN : z.string(),

})


envSchema.parse(process.env);

declare global {
    namespace NodeJS{
        interface ProcessEnv extends z.infer<typeof envSchema>{}
    }
}