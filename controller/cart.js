import { models } from "@/database/models";
import Cart from "@/pages/User/cart";

const {Carts} = models;




//Controller for get method

export async function getCart(req, res) {
    try {
      const cart = await Carts.findAll();
      if (cart) {
        console.log(cart, "serverside");
        return await res.status(200).send(cart);
      }
      return res.status(500).send({ error: "Oops! something wrong" });
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }
  // contoller for single get method
  

//   export async function getCart_category(req, res) {
//     try {
//       const {id} = req.query;
//       const drugs = await Carts.findAll({where:{ category: id}});
//       if(drugs.length > 0) {
//         return await res.status(200).send(drugs);
//       }
//       return res.status(404).json({message: "No drugs found for this category"})
//     } catch (error) {
//       res.status(500).send({ error: "Oops! something wrong" });
//     }
//   }

  export async function getOneCart(req, res) {
    const {cartId} = req.query;

    try {
      if (cartId) {
        const cart = await Carts.findOne({ where: { id: cartId } });
        if (cart) return res.status(200).send(cart);
      }
      // res.status(404).json({ error: "cart not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the cart" });
    }
  }
  
  //controller to post
  export async function postCart(req, res) {
    try {
      
      const result = await Carts.create(req.body);
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
  
  export async function putCart(req, res) {
    try {
      const { models, cartId } = req.body;
      if (cartId) {
        const cart = await Carts.findOne({
          where: { id: cartId },
        });
        if (cart) {
          cart.set(models);
          await cart.save();
          return res
            .status(200)
            .send({ message: "Updated successfully", isUpdated: true });
        }
      }
      res
        .status(500)
        .json({ message: "cart not Selected...!", isUpdated: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while updating the data", isUpdated: false });
    }
  }
  
  //Controller for delete method
  
  export async function deleteCart(req, res) {
    try {
      const {cartId}  = req.body;
      console.log(cartId, 'from query param')
      if (cartId) {
        const cart = await Carts.findOne({
          where: { id: cartId },
        });
        if (cart) {
          await cart.destroy();
          return await res
          .status(200)
          .send({ message: "Deleted successfully", isDeleted: true });
        }
       
      }
      console.log(cartId, "error");
      return res
        .status(404)
        .json({ message: "drug not selected", isDeleted: false });
    } catch (error) {
      res.status(404).json({ error: "Error while deleting the drug" });
    }
  }