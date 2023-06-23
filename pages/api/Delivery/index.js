import {
  getDelivery,
  postDelivery,
  putDelivery,
  deleteDelivery,
} from "@/controller/deliveryDetails";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      getDelivery(req, res);
      break;
    case "POST":
      postDelivery(req, res);
      break;
    case "PUT":
      putDelivery(req, res);
      break;
    default:
      deleteDelivery(req, res);
      break;
  }
}
