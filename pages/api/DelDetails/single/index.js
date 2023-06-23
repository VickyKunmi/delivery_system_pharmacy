import {
    getOneDeliveryDetails,
    postDeliveryDetails,
    putDeliveryDetails,
    deleteDeliveryDetails,
  } from "@/controller/deldetails";
  
  export default async function handler(req, res) {
    // const { deliveryId } = req.query;
    const { method } = req;
  
   if (method === "GET") return getOneDeliveryDetails(req, res);
   if (method === "POST") return postDeliveryDetails(req, res);
   if (method === "PUT") return putDeliveryDetails(req, res);
   if (method === "DELETE") return deleteDeliveryDetails(req, res);
  }
  