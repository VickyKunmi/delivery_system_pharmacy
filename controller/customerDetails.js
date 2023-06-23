import { models } from "@/database/models";
import bcrypt from "bcryptjs";
const { Users } = models;

//Controller for get method

export async function getUser(req, res) {
    try {
        const users = await models.Users.findAll();
        res.status(200).json({ users: users });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
}
// contoller for single get method

export async function getOneUser(req, res) {
  const {id} = req.query;
  console.log(id, "id")
  try {
    // Find the user in the database
    const user = await models.Users.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//controller to post
export async function postUser(req, res) {
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

//COntroller to put data

export async function putUser(req, res) {
  try {
    const { models, categoryId } = req.body;
    if (categoryId) {
      const category = await Users.findOne({
        where: { id: categoryId },
      });
      if (category) {
        category.set(models);
        await category.save();
        return res
          .status(200)
          .send({ message: "Updated successfully", isUpdated: true });
      }
    }
    res
      .status(500)
      .json({ message: "category not Selected...!", isUpdated: false });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating the data", isUpdated: false });
  }
}

//Controller for delete method

export async function deleteUser(req, res) {
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
