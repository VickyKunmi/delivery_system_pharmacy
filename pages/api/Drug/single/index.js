import { getOneDrug, postDrug, putDrug, deleteDrug } from "@/controller/drug";



export default async function handler(req, res) {
    const { drugId } = req.query;
  const { method } = req;

 if (method === "GET") return getOneDrug(req, res, drugId);
 if (method === "POST") return postDrug(req, res);
 if (method === "PUT") return putDrug(req, res);
 if (method === "DELETE") return deleteDrug(req, res);
}