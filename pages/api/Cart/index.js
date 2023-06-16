import { getCart, postCart, putCart, deleteCart } from "@/controller/cart";



export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET":
        getCart(req, res);
        break;
      case "POST":
        postCart(req, res);
        break;
      case "PUT":
        putCart(req, res);
        break;
      default:
        deleteCart(req, res);
        break;
    }
  }