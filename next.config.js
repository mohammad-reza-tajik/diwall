/** @type {import('next').NextConfig} */
const {PHASE_DEVELOPMENT_SERVER} = require("next/constants")

const nextConfig = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER)
        return {
            reactStrictMode: true,

            env: {
                mongodb_url: "mongodb://127.0.0.1:27017/online_shop"
            }
        }


}

module.exports = nextConfig
