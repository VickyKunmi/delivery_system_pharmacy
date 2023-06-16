import {
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} from "@/controller/category";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      getCategory(req, res);
      break;
    case "POST":
      postCategory(req, res);
      break;
    case "PUT":
      putCategory(req, res);
      break;
    default:
      deleteCategory(req, res);
      break;
  }
}
