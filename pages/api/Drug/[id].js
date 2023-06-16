import { getDrug_category } from "@/controller/drug";

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const { categoryId } = req.query;
    return getDrug_category(req, res, categoryId);
  }
  res.status(405).end();
}
