import type ProductType from "@/types/product";
export default interface UserType {
    username: string;
    password?: string;
    email: string;
    _id: string;
    wishlist: ProductType[];
    cart: { product:ProductType , quantity: number  }[];
    role: "user" | "admin";
}