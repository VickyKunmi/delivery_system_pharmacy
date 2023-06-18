import {
  getOrderdetail,
  postOrderDetail,
  putOrderDetail,
  deleteOrderDetail,
} from "@/controller/orderDetails";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      getOrderdetail(req, res);
      break;
    case "POST":
      postOrderDetail(req, res);
      break;
    case "PUT":
      putOrderDetail(req, res);
      break;
    default:
      deleteOrderDetail(req, res);
      break;
  }
}
