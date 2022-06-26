import Product from "../../db/productModel";

export default function handler(req, res) {

  if (req.method !== "POST") {
    res.status(405).send({message: 'Only POST requests allowed'})
  }

}