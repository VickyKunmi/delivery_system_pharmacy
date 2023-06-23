import {
 
    postLandMarks,
    putLandmarks,
    deleteLandMarks,
    getLandMarks,
    } from "@/controller/landmark";
    

    
 export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET":
        getLandMarks(req, res);
        break;
      case "POST":
        postLandMarks(req, res);
        break;
      case "PUT":
        putLandmarks(req, res);
        break;
      default:
        deleteLandMarks(req, res);
        break;
    }
  }