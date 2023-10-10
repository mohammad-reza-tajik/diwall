/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://diwall.vercel.app/",
    generateRobotsTxt: true,
}