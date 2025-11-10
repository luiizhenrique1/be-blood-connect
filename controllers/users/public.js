import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
    try {
        const user = req.body;

        const findUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        if (findUser) {
            return res.status(401).json({ message: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);


        const result = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
                role: user.role,
                location: user.location,
                bloodGroup: user?.bloodGroup || null
            }
        });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server issue.' });
    }
}

const loginUser = async (req, res) => {
    try {
        const userInfo = req.body;

        // find the user inside the db
        const user = await prisma.user.findUnique({
            where: { email: userInfo.email }
        });

        // check if exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // compare the db password with the input
        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password.' });
        }

        // generate jwt token
        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role, location: user.location, bloodGroup: user.bloodGroup }, JWT_SECRET, { expiresIn: '15m' }
        );

        res.status(200).json(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server issue.' });
    }
}

export default { loginUser, createUser }