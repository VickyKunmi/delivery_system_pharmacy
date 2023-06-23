import {
 getOneLocation,
 postLocation,
 putLocation,
 deleteLocation,
  } from "@/controller/location";
  
  export default async function handler(req, res) {
    const { locationId } = req.query;
    const { method } = req;
  
   if (method === "GET") return getOneLocation(req, res, locationId);
   if (method === "POST") return postLocation(req, res);
   if (method === "PUT") return putLocation(req, res);
   if (method === "DELETE") return deleteLocation(req, res);
  }
  