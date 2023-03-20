const STATIC_CACHE_NAME = "static-v6";
const DYNAMIC_CACHE_NAME = "dynamic-v1";

self.addEventListener("install", function (event) {
    event.waitUntil((async () => {

            const cache = await caches.open(STATIC_CACHE_NAME);
            await cache.addAll([
                // "/assets/pictures/banner-desktop.jpg",
                // "/assets/pictures/logo.png",
                // "/assets/pictures/banner-mobile.jpg",
                "/assets/icons/bed.svg",
                "/assets/icons/chair.svg",
                "/assets/icons/kitchen.svg",
                "/assets/icons/microphone.svg",
                "/assets/icons/office.svg",
                "/assets/icons/sofa.svg",
                "/assets/icons/child_room.svg",
                "/offline.html",
                "/",
                "/assets/fonts/dana-fanum-bold.woff2",
                "/assets/fonts/dana-fanum-medium.woff2",
                "/assets/fonts/dana-black.woff2",
            ])

        }
    )())


})

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
            const keys = await caches.keys();
            keys.forEach(key => {
                if (key !== STATIC_CACHE_NAME)
                    caches.delete(key)
            })

            await self.clients.claim();

        })()
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith((async () => {
            let res = await caches.match(event.request)
            if (res)
                return res
            else
                try {
                    res = await fetch(event.request)
                    return res
                } catch {
                    const cache = await caches.open(STATIC_CACHE_NAME)
                    res = await cache.match("/offline.html")
                    console.log(res)
                    return res
                }

        })()
    )


})
