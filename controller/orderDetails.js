import { models } from "@/database/models";


const {OrderDetails} = models;




//Controller for get method

export async function getOrderdetail(req, res) {
    try {
      const orderdetails = await OrderDetails.findAll();
      if (orderdetails) {
        console.log(orderdetails, "serverside");
        return await res.status(200).send(orderdetails);
      }
      return res.status(500).send({ error: "Oops! something wrong" });
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }
  // contoller for single get method
  


  export async function getOneOrderDetail(req, res) {
    const {orderdetailID} = req.query;

    try {
      if (orderdetailID) {
        const cart = await OrderDetails.findOne({ where: { id: orderdetailID } });
        if (cart) return res.status(200).send(cart);
      }
      // res.status(404).json({ error: "cart not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the order details" });
    }
  }
  
  //controller to post
  export async function postOrderDetail(req, res) {
    try {
      
      const result = await OrderDetails.create(req.body);
      console.log(req.body, "req body")
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
  
  export async function putOrderDetail(req, res) {
    try {
      const { models, orderdetailID } = req.body;
      if (orderdetailID) {
        const orderdetail = await OrderDetails.findOne({
          where: { id: orderdetailID },
        });
        if (orderdetail) {
          orderdetail.set(models);
          await orderdetail.save();
          return res
            .status(200)
            .send({ message: "Updated successfully", isUpdated: true });
        }
      }
      res
        .status(500)
        .json({ message: "orderdetail not Selected...!", isUpdated: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while updating the data", isUpdated: false });
    }
  }
  
  //Controller for delete method
  
  export async function deleteOrderDetail(req, res) {
    try {
      const {orderdetailID}  = req.query;
      console.log(orderdetailID, 'from query param')
      if (parseInt(orderdetailID)) {
        const orderdetail = await Drugs.findOne({
          where: { id: orderdetailID },
        });
        if (orderdetail) {
          await orderdetail.destroy();
          return await res
          .status(200)
          .send({ message: "Deleted successfully", isDeleted: true });
        }
       
      }
      console.log(orderdetailID, "error");
      return res
        .status(404)
        .json({ message: "drug not selected", isDeleted: false });
    } catch (error) {
      res.status(404).json({ error: "Error while deleting the drug" });
    }
  }