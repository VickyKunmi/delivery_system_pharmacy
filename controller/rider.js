import { models } from "@/database/models";
const {Riders} = models;



//Controller for get method

export async function getRider(req, res) {
    try {
      const rider = await Riders.findAll();
      if (rider) {
        console.log(rider, "serverside");
        return await res.status(200).send(rider);
      }
      return res.status(500).send({ error: "Oops! something wrong" });
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }
  // contoller for single get method
  
  export async function getOneRider(req, res, riderId) {

    try {
      if (riderId) {
        const rider = await Riders.findAll({ where: { id: riderId } });
        if (rider) return res.status(200).send(rider);
      }
      res.status(404).json({ error: "rider not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the rider" });
    }
  }
  
  //controller to post
  export async function postRider(req, res) {
    try {
      // const { formData } = req.body;
      // console.log(req.body, "form data");
      // console.log(req, "request ----------------")
      const result = await Riders.create(req.body);
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
  
  export async function putRider(req, res) {
    try {
      const { models, riderId } = req.body;
      if (riderId) {
        const rider = await Riders.findOne({
          where: { id: riderId },
        });
        if (rider) {
          rider.set(models);
          await rider.save();
          return res
            .status(200)
            .send({ message: "Updated successfully", isUpdated: true });
        }
      }
      res
        .status(500)
        .json({ message: "rider not Selected...!", isUpdated: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while updating the data", isUpdated: false });
    }
  }
  
  //Controller for delete method
  
  export async function deleteRider(req, res) {
    try {
      const {riderId}  = req.query;
      console.log(riderId, 'from query param')
      if (parseInt(riderId)) {
        const rider = await Riders.findOne({
          where: { id: riderId },
        });
        if (rider) {
          await rider.destroy();
          return await res
          .status(200)
          .send({ message: "Deleted successfully", isDeleted: true });
        }
       
      }
      console.log(riderId, "error");
      return res
        .status(404)
        .json({ message: "rider not selected", isDeleted: false });
    } catch (error) {
      res.status(404).json({ error: "Error while deleting the rider" });
    }
  }