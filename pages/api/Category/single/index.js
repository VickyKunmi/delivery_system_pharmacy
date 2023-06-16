import {
  getOneCategory,
  postCategory,
  putCategory,
  deleteCategory,
} from "@/controller/category";

export default async function handler(req, res) {
  const { categoryId } = req.query;
  const { method } = req;

 if (method === "GET") return getOneCategory(req, res, categoryId);
 if (method === "POST") return postCategory(req, res);
 if (method === "PUT") return putCategory(req, res);
 if (method === "DELETE") return deleteCategory(req, res);
}
