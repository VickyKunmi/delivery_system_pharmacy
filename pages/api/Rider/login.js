// // Import necessary modules and functions
// import { models } from "@/database/models";
// const { Riders } = models;

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { username, password } = req.body;

//     try {
//       // Perform database query to check if the username and password match
//       const rider = await Riders.findOne({
//         where: { username, password },
//       });

//       if (rider) {
//         // Login successful
//         // Retrieve the full information of the rider
//         const fullRiderInfo = await Riders.findOne({
//           where: { id: rider.id }, // Assuming the rider has an "id" field
//           attributes: { exclude: ["password"] }, // Exclude the password field from the response
//         });

//         if (fullRiderInfo) {
//           // Return the full rider information
//           return res.status(200).json(fullRiderInfo);
//         } else {
//           return res.status(404).json({ message: "Rider not found" });
//         }
//       } else {
//         // Login failed
//         return res.status(401).json({ message: "Invalid username or password" });
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       return res.status(500).json({ message: "Error logging in" });
//     }
//   } else {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }





















import { models } from "@/database/models";
import bcrypt from "bcryptjs";

const { Riders } = models;

const sendSuccessResponse = async ({ res, admin }) => {
  const { id, username, plate_number, available_status } = admin;
  const validUser = {
    id,
    username,
    plate_number,
    available_status
  };
  await res.status(200).json(validUser);
};

const sendErrorResponse = async ({ res, message }) => {
  await res.status(401).json({ error: message });
};

const validateUser = async ({ password, admin, res }) => {
  // Compare the password directly without hashing
  if (password === admin.password) {
    return sendSuccessResponse({ res, admin });
  } else {
    return sendErrorResponse({ res, message: "Invalid credentials" });
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password, address, available_status, plate_number, phone_number } = req.body;
    const admin = await Riders.findOne({ where: { username, address, available_status, plate_number, phone_number }, raw: true });
    if (admin) {
      return validateUser({ password, admin, res });
    } else {
      return sendErrorResponse({ res, message: "Invalid credentials" });
    }
  }
}
