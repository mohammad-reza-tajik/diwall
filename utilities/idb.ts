import localforage from "localforage";
import type {ProductType} from "../db/productModel";

let objectStore : LocalForage;
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
}
export default objectStore;

