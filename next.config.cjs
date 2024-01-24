/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
}

module.exports = nextConfig
