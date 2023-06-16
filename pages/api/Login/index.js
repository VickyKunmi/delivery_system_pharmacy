import bcrypt from 'bcrypt';
// import User from '../../models/User';
import { models } from '@/database/models';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await models.Users.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    res.status(200).json({ message: 'Login successful', user });
    bcrypt } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }

}