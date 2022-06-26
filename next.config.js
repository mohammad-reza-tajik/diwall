/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['www.manzel.ir']
  },
  env:{
    mongodb_url:"mongodb+srv://MORTA:Lant12344321@cluster0.ax5a2.mongodb.net/?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
