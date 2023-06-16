import bcrypt from "bcryptjs"
import { models } from "@/database/models"
import { Alert } from "@mui/material";



export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
    }
  
    const { email, password, first_name, last_name, phone_number, } = req.body;
  
    try {
      // Check if the email is already registered
      const existingUser = await models.Users.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'Email already exists' });
        <Alert>Email account exist</Alert>
        return;
      }
  
      // Create a hashed password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user record in the database
      const newUser = await models.Users.create({ email, first_name, last_name, phone_number ,password: hashedPassword });
    //   const newUser = await models.Users.create({ email, first_name, last_name, phone_number ,password });
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }