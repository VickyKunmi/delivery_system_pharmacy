import { getLocation,
         postLocation,
         putLocation,
         deleteLocation,

 } from "@/controller/location";

 export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET":
        getLocation(req, res);
        break;
      case "POST":
        postLocation(req, res);
        break;
      case "PUT":
        putLocation(req, res);
        break;
      default:
        deleteLocation(req, res);
        break;
    }
  }