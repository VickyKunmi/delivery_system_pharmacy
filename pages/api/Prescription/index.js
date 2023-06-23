import {
    getPrescription,
    postPrescription,
    putPrescription,
    deletePrescription,
  } from "@/controller/prescription";
  
  export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET":
        getPrescription(req, res);
        break;
      case "POST":
        postPrescription(req, res);
        break;
      case "PUT":
        putPrescription(req, res);
        break;
      default:
        deletePrescription(req, res);
        break;
    }
  }
  