import Product from "@/models/productModel";
import User from "@/models/userModel";

/***
 importing all models here and exporting them again has two advantages :
 1.creates a central place to keep and use models
 2.we make sure that the Product model is initialized before User model which has cause some problems several times
 */

export {Product,User}