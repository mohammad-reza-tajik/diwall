self.addEventListener("install",function (event) {
    event.waitUntil(
        caches.open("static").then((cache)=> {
            cache.addAll([
                "/assets/pictures/hero-image-desktop.png",
                "/",
                "/assets/fonts/dana-bold.ttf",
                "/assets/fonts/dana-medium.ttf",
                "/_next/static/chunks/main-27d355ecdf567f83.js",
                "/_next/static/chunks/pages/_app-1e9d895f12ee46a3.js",
                "/_next/static/chunks/pages/index-b7c5352ed1263844.js"
            ])
        })
    )
})


self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then((res)=>{
            if (res)
                return res
            else
                return fetch(event.request)
        })
    )
})