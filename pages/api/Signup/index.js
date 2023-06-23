import bcrypt from "bcryptjs";
import { models } from "@/database/models";
import { Alert } from "@mui/material";

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await handlePostRequest(req, res);
      break;
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}

async function handlePostRequest(req, res) {
  const { email, password, first_name, last_name, phone_number } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await models.Users.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    // Create a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await models.Users.create({ email, first_name, last_name, phone_number, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleGetRequest(req, res) {
  try {
    const users = await models.Users.findAll();
    res.status(200).json({ users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleDeleteRequest(req, res) {
  const { id } = req.query;

  try {
    // Find the user to delete in the database
    const user = await models.Users.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Delete the user record from the database
    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}








