import {
    getOneOrderDetail,
    postOrderDetail,
    putOrderDetail,
    deleteOrderDetail,
  } from "@/controller/orderDetails";
  
  
  export default async function handler(req, res) {
      const { orderdetailId } = req.query;
    const { method } = req;
  
   if (method === "GET") return getOneOrderDetail(req, res, orderdetailId);
   if (method === "POST") return postOrderDetail(req, res);
   if (method === "PUT") return putOrderDetail(req, res);
   if (method === "DELETE") return deleteOrderDetail(req, res);
  }