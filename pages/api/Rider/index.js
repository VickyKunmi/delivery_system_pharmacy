import { getRider, postRider, putRider, deleteRider } from "@/controller/rider";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      getRider(req, res);
      break;
    case "POST":
      postRider(req, res);
      break;
    case "PUT":
      putRider(req, res);
      break;
    default:
      deleteRider(req, res);
      break;
  }
}
