import { getDrug, postDrug, putDrug, deleteDrug } from "@/controller/drug";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      getDrug(req, res);
      break;
    case "POST":
      postDrug(req, res);
      break;
    case "PUT":
      putDrug(req, res);
      break;
    default:
      deleteDrug(req, res);
      break;
  }
}
