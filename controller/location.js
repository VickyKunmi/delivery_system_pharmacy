import { models } from "@/database/models";

const {Location} =models;











//Controller for get method

export async function getLocation(req, res) {
    try {
      const location = await Location.findAll();
      if (location) {
        console.log(location, "serverside");
        return await res.status(200).send(location);
      }
      return res.status(500).send({ error: "Oops! something wrong" });
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }
  // contoller for single get method
  
  export async function getOneLocation(req, res, locationId) {

    try {
      if (locationId) {
        const location = await Location.findAll({ where: { id: locationId } });
        if (location) return res.status(200).send(location);
      }
      res.status(404).json({ error: "location not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the location" });
    }
  }
  
  //controller to post
  export async function postLocation(req, res) {
    try {
      // const { formData } = req.body;
      // console.log(req.body, "form data");
      // console.log(req, "request ----------------")
      const result = await Location.create(req.body);
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
  
  export async function putLocation(req, res) {
    try {
      const { models, locationId } = req.body;
      if (locationId) {
        const location = await Location.findOne({
          where: { id: locationId },
        });
        if (location) {
          location.set(models);
          await location.save();
          return res
            .status(200)
            .send({ message: "Updated successfully", isUpdated: true });
        }
      }
      res
        .status(500)
        .json({ message: "location not Selected...!", isUpdated: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while updating the data", isUpdated: false });
    }
  }
  
  //Controller for delete method
  
  export async function deleteLocation(req, res) {
    try {
      const {locationId}  = req.query;
      console.log(locationId, 'from query param')
      if (parseInt(locationId)) {
        const location = await Location.findOne({
          where: { id: locationId },
        });
        if (location) {
          await location.destroy();
          return await res
          .status(200)
          .send({ message: "Deleted successfully", isDeleted: true });
        }
       
      }
      console.log(locationId, "error");
      return res
        .status(404)
        .json({ message: "location not selected", isDeleted: false });
    } catch (error) {
      res.status(404).json({ error: "Error while deleting the location" });
    }
  }