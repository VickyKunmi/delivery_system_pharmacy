import {
  getOneDrug,
  postDrug,
  putDrug,
  deleteDrug,
} from "@/controller/featuredDrug";



export default async function handler(req, res) {
    // const { featuredDrugId } = req.query;
  const { method } = req;

 if (method === "GET") return getOneDrug(req, res);
//  if (method === "POST") return postDrug(req, res);
//  if (method === "PUT") return putDrug(req, res);
//  if (method === "DELETE") return deleteDrug(req, res);
}