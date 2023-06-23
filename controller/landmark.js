import {models} from "@/database/models";

const {LandMarks, Price}=models


//Controller for get method

export async function getLandMarks(req, res) {
    try {
      const landmarks= await LandMarks.findAll();
      if (landmarks) {
        console.log(landmarks, "serverside");
        return await res.status(200).send(landmarks);
      }
      return res.status(500).send({ error: "Oops! something wrong" });
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }




  export default async function getLandmark_location(req, res) {
    const { id } = req.query;
  
    try {
      const landmarks = await LandMarks.findAll({
        where: { locationId: id },
        // Only fetch necessary attributes
      include:[{
        model: Price,
        as: 'prices'
      }]
      }
      );
  
      res.status(200).json(landmarks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  




  // contoller for single get method
  
  export async function getOneLandMarks(req, res, landmarksId) {

    try {
      if (landmarksId) {
        const landmarks= await LandMarks.findAll({ where: { id: landmarksId } });
        if (landmarks) return res.status(200).send(landmarks);
      }
      res.status(404).json({ error: "landmark not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the landmark" });
    }
  }
  
  //controller to post
  export async function postLandMarks(req, res) {
    try {
      // const { formData } = req.body;
      // console.log(req.body, "form data");
      // console.log(req, "request ----------------")
      const result = await LandMarks.create(req.body);
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
  
  export async function putLandmarks(req, res) {
    try {
      const { models, landmarksId } = req.body;
      if (landmarksId) {
        const landmarks= await LandMarks.findOne({
          where: { id: landmarksId },
        });
        if (landmarks) {
          landmarks.set(models);
          await landmarks.save();
          return res
            .status(200)
            .send({ message: "Updated successfully", isUpdated: true });
        }
      }
      res
        .status(500)
        .json({ message: "landmark not Selected...!", isUpdated: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while updating the data", isUpdated: false });
    }
  }
  
  //Controller for delete method
  
  export async function deleteLandMarks(req, res) {
    try {
      const {landmarksId}  = req.query;
      console.log(landmarksId, 'from query param')
      if (parseInt(landmarksId)) {
        const landmarks = await LandMarks.findOne({
          where: { id: landmarksId },
        });
        if (landmarks) {
          await landmarks.destroy();
          return await res
          .status(200)
          .send({ message: "Deleted successfully", isDeleted: true });
        }
       
      }
      console.log(landmarksId, "error");
      return res
        .status(404)
        .json({ message: "landmark not selected", isDeleted: false });
    } catch (error) {
      res.status(404).json({ error: "Error while deleting the landmarks" });
    }
  }