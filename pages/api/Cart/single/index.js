import { getOneCart, postCart, putCart, deleteCart } from "@/controller/cart";export default async function handler(req, res) {
    const { cartId } = req.query;
    const { method } = req;
  
   if (method === "GET") return getOneCart(req, res, cartId);
   if (method === "POST") return postCart(req, res);
   if (method === "PUT") return putCart(req, res);
   if (method === "DELETE") return deleteCart(req, res);
  }