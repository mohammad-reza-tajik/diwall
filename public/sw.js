const STATIC_CACHE_NAME = "static-v3";
const DYNAMIC_CACHE_NAME = "dynamic-v1";

self.addEventListener("install", function (event) {
    event.waitUntil((async () => {

            const cache = await caches.open(STATIC_CACHE_NAME);
            await cache.addAll([
                "/assets/pictures/hero-image-desktop.png",
                "/assets/pictures/hero-image-mobile.jpg",
                "/",
                "/assets/fonts/dana-fanum-bold.woff2",
                "/assets/fonts/dana-fanum-medium.woff2",
            ])

        }
    )())


})

self.addEventListener("activate",(event)=>{
    event.waitUntil((async () => {
        const keys = await caches.keys();
        keys.forEach( key => {
            if (key !== STATIC_CACHE_NAME)
                caches.delete(key)
        })

    })()
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith((async () => {
            const res = await caches.match(event.request)
            if (res)
                return res
            else
                return fetch(event.request)

        })()
    )


})
