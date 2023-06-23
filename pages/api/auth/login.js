/* eslint-disable import/no-anonymous-default-export */
import { models } from "@/database/models";
import { compare } from "bcrypt";


const {Riders} = models;

export default async (req, res) => {
  if(req.method === 'POST') {
    const {username, password} = req.body;
    try{
      const admin = await Riders.findOne({where: {username}});

      if(!admin) {
        res.status(401).json ({error: 'Invalid username or password.'})
        return;
      }
      const passwordMatch = await compare(password, admin.password);

      if (!passwordMatch) {
        res.status(401).json({ error: 'Invalid username or password.' });
        return;
      }
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error logging in.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}