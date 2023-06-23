import {
    getDeliveryDetails,
    postDeliveryDetails,
    putDeliveryDetails,
    deleteDeliveryDetails,
  } from "@/controller/deldetails";
  
  export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET":
        getDeliveryDetails(req, res);
        break;
      case "POST":
        postDeliveryDetails(req, res);
        break;
      case "PUT":
        putDeliveryDetails(req, res);
        break;
      default:
        deleteDeliveryDetails(req, res);
        break;
    }
  }
  