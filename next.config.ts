import type {NextConfig} from "next";

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    eslint : {
        ignoreDuringBuilds : true
    }
} satisfies NextConfig;

module.exports = nextConfig
