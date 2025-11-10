import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({ omit: { password: true } });

        res.status(200).json({ message: 'Users listed.', users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server failed.' });
    }
}

const findUser = async (req, res) => {
    try {
        const findEmail = req.query?.email,
            foundUser = await prisma.user.findUnique({
                where: { email: findEmail }
            })

        if (!foundUser) {
            return res.status(400).json({ message: 'User not found.' });
        }

        return res.status(200).json(foundUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server failed.' });
    }
}

export default { listUsers, findUser }