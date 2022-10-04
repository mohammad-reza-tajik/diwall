/** @type {import('next').NextConfig} */
const {PHASE_DEVELOPMENT_SERVER} = require("next/constants")

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER)
  return {

  reactStrictMode: true,
  images:{
    domains:['www.manzel.ir']
  },

  env:{
    mongodb_url:"mongodb://127.0.0.1:27017/online_shop"
  }
  }

  else
    return {
      reactStrictMode: true,
      images:{
        domains:['www.manzel.ir']
      },

      env:{
        mongodb_url:"mongodb+srv://MORTA:Lant12344321@cluster0.ax5a2.mongodb.net/online_shop?retryWrites=true&w=majority"
      }

    }
}

module.exports = nextConfig
