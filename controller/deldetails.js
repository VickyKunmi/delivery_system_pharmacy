import {models} from "@/database/models";

const {DeliveryDetails} = models;


export async function getDeliveryDetails(req, res) {
    try {
      const deliverydetail = await DeliveryDetails.findAll();
      if (deliverydetail) {
        console.log(deliverydetail, "serverside");
        return await res.status(200).send(deliverydetail);
      }
      return res.status(500).send({ error: "Oops! something wrong" });
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }
  // contoller for single get method
  
  export async function getOneDeliveryDetails(req, res, deliverydetailId) {
    // const {categoryId} = req.query;
    try {
      if (deliverydetailId) {
        const deliverydetail = await DeliveryDetails.findAll({ where: { id: deliverydetailId } });
        if (deliverydetail) return res.status(200).send(deliverydetail);
      }
      res.status(404).json({ error: "deliverydetail not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the deliverydetail" });
    }
  }
  
  //controller to post
  export async function postDeliveryDetails(req, res) {
    try {
      // const { formData } = req.body;
      // console.log(req.body, "form data");
      const result = await DeliveryDetails.create(req.body);
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
  
  export async function putDeliveryDetails(req, res) {
    try {
      const { models, deliverydetailId} = req.body;
      if (deliverydetailId) {
        const deliverydetail = await DeliveryDetails.findOne({
          where: { id: deliverydetailId },
        });
        if (deliverydetail) {
          category.set(models);
          await deliverydetail.save();
          return res
            .status(200)
            .send({ message: "Updated successfully", isUpdated: true });
        }
      }
      res
        .status(500)
        .json({ message: "deliverydetail not Selected...!", isUpdated: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while updating the data", isUpdated: false });
    }
  }
  
  //Controller for delete method
  
  export async function deleteDeliveryDetails(req, res) {
    try {
      const {deliverydetailId}  = req.query;
      console.log(deliverydetailId, 'from query param')
      if (parseInt(deliverydetailId)) {
        const deliverydetail = await DeliveryDetails.findOne({
          where: { id:deliverydetailId },
        });
        if (deliverydetail) {
          await deliverydetail.destroy();
          return await res
          .status(200)
          .send({ message: "Deleted successfully", isDeleted: true });
        }
       
      }
      console.log(deliverydetailId, "error");
      return res
        .status(404)
        .json({ message: "delivery detail not selected", isDeleted: false });
    } catch (error) {
      res.status(404).json({ error: "Error while deleting the delivery detail" });
    }
  }
  