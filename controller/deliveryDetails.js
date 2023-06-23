import { models } from "@/database/models";

const { Delivery } = models;

//Controller for get method

export async function getDelivery(req, res) {
  try {
    const delivery = await Delivery.findAll();
    if (delivery) {
      console.log(delivery, "serverside");
      return await res.status(200).send(delivery);
    }
    return res.status(500).send({ error: "Oops! something wrong" });
  } catch (error) {
    res.status(500).send({ error: "Oops! something wrong" });
  }
}
// contoller for single get method

export async function getOneDelivery(req, res, deliveryId) {
  // const {deliveryId} = req.query;
  try {
    if (deliveryId) {
      const delivery = await Delivery.findAll({ where: { id: deliveryId } });
      if (delivery) return res.status(200).send(delivery);
    }
    res.status(404).json({ error: "delivery not selected" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the delivery" });
  }
}

//controller to post
export async function postDelivery(req, res) {
  try {
    // const { formData } = req.body;
    // console.log(req.body, "form data");
    const result = await Delivery.create(req.body);
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

export async function putDelivery(req, res) {
  try {
    const { models, deliveryId } = req.body;
    if (deliveryId) {
      const delivery = await Delivery.findOne({
        where: { id: deliveryId },
      });
      if (delivery) {
        delivery.set(models);
        await delivery.save();
        return res
          .status(200)
          .send({ message: "Updated successfully", isUpdated: true });
      }
    }
    res
      .status(500)
      .json({ message: "delivery not Selected...!", isUpdated: false });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating the data", isUpdated: false });
  }
}

//Controller for delete method

export async function deleteDelivery(req, res) {
  try {
    const {deliveryId}  = req.query;
    console.log(deliveryId, 'from query param')
    if (parseInt(deliveryId)) {
      const delivery = await Delivery.findOne({
        where: { id: deliveryId },
      });
      if (delivery) {
        await delivery.destroy();
        return await res
        .status(200)
        .send({ message: "Deleted successfully", isDeleted: true });
      }
     
    }
    console.log(deliveryId, "error");
    return res
      .status(404)
      .json({ message: "delivery not selected", isDeleted: false });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the delivery" });
  }
}
