import {
   getOnePrescription,
    postPrescription,
    putPrescription,
    deletePrescription,
  } from "@/controller/prescription";
  
  export default async function handler(req, res) {
    // const { deliveryId } = req.query;
    const { method } = req;
  
   if (method === "GET") return getOnePrescription(req, res);
   if (method === "POST") return postPrescription(req, res);
   if (method === "PUT") return putPrescription(req, res);
   if (method === "DELETE") return deletePrescription(req, res);
  }
  