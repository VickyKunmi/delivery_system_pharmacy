import {
getOneLandMarks,
postLandMarks,
putLandmarks,
deleteLandMarks,
} from "@/controller/landmark";


export default async function handler(req, res) {
    const { landmarksId } = req.query;
    const { method } = req;
  
   if (method === "GET") return getOneLandMarks(req, res, landmarksId);
   if (method === "POST") return postLandMarks(req, res);
   if (method === "PUT") return putLandmarks(req, res);
   if (method === "DELETE") return deleteLandMarks(req, res);
  }
  