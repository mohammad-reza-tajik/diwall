// import { openDB, deleteDB, wrap, unwrap } from "node_modules/idb/build/index.js";
// import { openDB, deleteDB, wrap, unwrap } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';
// import "./idb.js"


const STATIC_CACHE_NAME = "static-v69";
const DYNAMIC_CACHE_NAME = "dynamic-v1";

const addToStaticCache = async (resources) => {
    const staticCache = await caches.open(STATIC_CACHE_NAME);
    await staticCache.addAll(resources)
}

const addToDynamicCache = async (resources) => {
    const dynamicCache = await caches.open(DYNAMIC_CACHE_NAME);
    await dynamicCache.addAll(resources)
}

const cacheFirst = async (event) => {
    try {
        let res = await caches.match(event.request);
        if (res) {
            return res

        } else {
            if (event.request.destination === "image") { // check if the type of the asset we're requesting to be an image
                // console.log(event.request)
                await addToDynamicCache([event.request])
            }
            return fetch(event.request);
        }

    } catch (err) {
        console.log(err)
    }
}

// async function doDatabaseStuff() {
//     const db = await openDB();
// }
self.addEventListener("install", event => {

    console.log("-----[ service worker installed ]-----");

    self.skipWaiting(); // returned promise can be ignored safely

    event.waitUntil(
        addToStaticCache(
            [
                "/favicon.ico",
                "/offline.html",
                "/",
                "/assets/fonts/dana-fanum-bold.woff2",
                "/assets/fonts/dana-fanum-medium.woff2",
                "/assets/fonts/dana-black.woff2",
            ]))

});
self.addEventListener("activate", event => {

    console.log("-----[ service worker activated ]-----");

    event.waitUntil((async () => {
            self.clients.claim();

            const keys = await caches.keys();
            keys.forEach(key => {
                if (key !== STATIC_CACHE_NAME)
                    caches.delete(key)
            })


        })()
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event))


})
