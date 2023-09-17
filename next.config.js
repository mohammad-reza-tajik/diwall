const withPWA = require('next-pwa')({
    dest: 'public',
    skipWaiting : true,
    disableDevLogs : true,
    disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig =  {

            reactStrictMode: true,
            poweredByHeader: false,
}

module.exports = withPWA(nextConfig)
