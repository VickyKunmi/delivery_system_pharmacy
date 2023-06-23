import {
    getOneDelivery,
    postDelivery,
    putDelivery,
    deleteDelivery,
  } from "@/controller/deliveryDetails";
  
  export default async function handler(req, res) {
    // const { deliveryId } = req.query;
    const { method } = req;
  
   if (method === "GET") return getOneDelivery(req, res);
   if (method === "POST") return postDelivery(req, res);
   if (method === "PUT") return putDelivery(req, res);
   if (method === "DELETE") return deleteDelivery(req, res);
  }
  