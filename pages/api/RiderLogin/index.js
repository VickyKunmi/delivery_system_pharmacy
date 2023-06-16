import bcrypt from "bcrypt"
import { models } from "@/database/models"

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.status(405).json({message: 'Method Not Allowed'});
        return;
    }
    const {username, password} = req.body;
    try {
        const rider = await models.Riders.findOne({where: {username}});
        if(!rider) {
            res.status(404).json({message: 'Invalid Rider details'});
            return;
        }
        // const isPasswordValid = await bcrypt.compare(password, rider.password);
        if(password !== rider.password){
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        res.status(200).json({ message: 'Login successful', rider });
        bcrypt } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    } 
}