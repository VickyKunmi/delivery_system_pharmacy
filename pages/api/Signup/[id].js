// import { models } from "@/database/models";
// import { models } from "@/database/models";

// export default async function handler(req, res) {
//   const { id } = req.query;

//   try {
//     // Find the user to delete in the database
//     const user = await models.Users.findByPk(id);
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     // Delete the user record from the database
//     await user.destroy();

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }












import { models } from "@/database/models";

export default async function handler(req, res) {
  const { id } = req.query;
  console.log(id, "new id")

  if (req.method === 'GET') {
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
  } else if (req.method === 'DELETE') {
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
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
