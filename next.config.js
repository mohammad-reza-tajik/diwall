/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    skipWaiting : true
})
// const {PHASE_DEVELOPMENT_SERVER} = require("next/constants")

const nextConfig =  {

            reactStrictMode: true,
            poweredByHeader: false,
}

module.exports = withPWA(nextConfig)
