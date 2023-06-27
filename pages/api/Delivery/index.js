// import {
//   getDelivery,
//   postDelivery,
//   putDelivery,
//   deleteDelivery,
// } from "@/controller/deliveryDetails";

// export default async function handler(req, res) {
//   const { method } = req;
//   switch (method) {
//     case "GET":
//       getDelivery(req, res);
//       break;
//     case "POST":
//       postDelivery(req, res);
//       break;
//     case "PUT":
//       putDelivery(req, res);
//       break;
//     default:
//       deleteDelivery(req, res);
//       break;
//   }
// }









import { models } from '@/database/models';

const { Delivery } = models;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve all customer details from the database
      const customers = await Delivery.findAll();

      // Handle success
      res.status(200).json({ customers });
    } catch (error) {
      // Handle error
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving customer details' });
    }
  } else if (req.method === 'POST') {
    const { name, phone_no, latitude, user_email, longitude, address, orderdetails, totalfee, deliveryFee, drugfee } = req.body;

    try {
      // Create a new customer in the database
      const customer = await Delivery.create({
        name,
        phone_no,
        latitude,
        longitude,
        orderdetails,
        totalfee,
        drugfee,
        deliveryFee,
        user_email,
        address, // Make sure the address field is included
      });

      // Handle success
      res.status(201).json({ customer });
    } catch (error) {
      // Handle error
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the customer' });
    }
  } else {
    res.status(404).end();
  }
}









