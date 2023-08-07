import localforage from "localforage";
// import type {ProductType} from "../db/productModel";

type driverType = "INDEXEDDB" | "LOCALSTORAGE";

class ObjectStore {
    private objectStore: LocalForage;

    constructor(storeName: string, driver: driverType = "INDEXEDDB", size: number = 8000000) {
        this.objectStore = localforage.createInstance({
            name: "dival",
            storeName,
            driver: localforage[driver],
            size,
        });
    }

    async getFromIDB(key: string) {
        return await this.objectStore.getItem(key)
    }

    async saveToIDB(key: string, value: any) {
        return await this.objectStore.setItem(key, value);
    }
}

export default ObjectStore;

/*let objectStore : LocalForage;
if (typeof window !== "undefined" && "indexedDB" in window) {
    objectStore = localforage.createInstance({
        name: "dival",
        storeName:"products",
        driver: localforage.INDEXEDDB,
        size: 8000000,
    });
}

export const getFromIDB = async (key:string) : Promise<{ product: ProductType, relatedProducts: ProductType[] } | null> => {
  const data : {product: ProductType , relatedProducts : ProductType[]} | null = await objectStore.getItem(key);
  return data
}

export const saveToIDB = async (key:string,value:any) => {
  return await objectStore.setItem(key,value);
}*/

