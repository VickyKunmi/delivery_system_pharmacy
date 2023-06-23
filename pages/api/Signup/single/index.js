import { getOneUser, postUser, deleteUser, putUser } from "@/controller/customerDetails";

export default async function handler (req, res) {
  const {id} = req.query;
  const { method } = req;

 if (method === "GET") return getOneUser(req, res, id);
 if (method === "POST") return postUser(req, res);
 if (method === "PUT") return putUser(req, res);
 if (method === "DELETE") return deleteUser(req, res);
}