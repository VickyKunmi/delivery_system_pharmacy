import {
  getOneRider,
  postRider,
  putRider,
  deleteRider,
} from "@/controller/rider";


export default async function handler(req, res) {
    const { riderId } = req.query;
  const { method } = req;

 if (method === "GET") return getOneRider(req, res, riderId);
 if (method === "POST") return postRider(req, res);
 if (method === "PUT") return putRider(req, res);
 if (method === "DELETE") return deleteRider(req, res);
}