import {models} from "@/database/models";

const {Prescription} = models;


export async function getPrescription(req, res) {
    try {
      const prescription = await Prescription.findAll();
      if (prescription) {
        console.log(prescription, "serverside");
        return await res.status(200).send(prescription);
      }
      return res.status(500).send({ error: "Oops! something wrong" });
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }
  // contoller for single get method
  
  export async function getOnePrescription(req, res, prescriptionId) {
    // const {categoryId} = req.query;
    try {
      if (prescriptionId) {
        const prescription = await Prescription.findAll({ where: { id: prescriptionId } });
        if (prescription) return res.status(200).send(prescription);
      }
      res.status(404).json({ error: "prescription not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the prescription" });
    }
  }
  
  //controller to post
  export async function postPrescription(req, res) {
    try {
      // const { formData } = req.body;
      // console.log(req.body, "form data");
      const result = await Prescription.create(req.body);
      if (result)
        return res
          .status(200)
          .send({ message: "Saved successfully", isSaved: true });
      if (!result)
        return res
          .status(500)
          .send({ message: "ooppss something went wrong!", isSaved: false });
    } catch (error) {
      return res.status(404).json({ error });
    }
  }
  
  //COntroller to put data
  
  export async function putPrescription(req, res) {
    try {
      const { models, prescriptionId} = req.body;
      if (prescriptionId) {
        const prescription = await Prescription.findOne({
          where: { id: prescriptionId },
        });
        if (prescription) {
          prescription.set(models);
          await prescription.save();
          return res
            .status(200)
            .send({ message: "Updated successfully", isUpdated: true });
        }
      }
      res
        .status(500)
        .json({ message: "prescription not Selected...!", isUpdated: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while updating the data", isUpdated: false });
    }
  }
  
  //Controller for delete method
  
  export async function deletePrescription(req, res) {
    try {
      const {prescriptionId}  = req.query;
      console.log(prescriptionId, 'from query param')
      if (parseInt(prescriptionId)) {
        const prescription = await Prescription.findOne({
          where: { id:prescriptionId },
        });
        if (prescription) {
          await prescription.destroy();
          return await res
          .status(200)
          .send({ message: "Deleted successfully", isDeleted: true });
        }
       
      }
      console.log(prescriptionId, "error");
      return res
        .status(404)
        .json({ message: "prescription not selected", isDeleted: false });
    } catch (error) {
      res.status(404).json({ error: "Error while deleting the prescription" });
    }
  }
  