import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                active: true
            },
            select: {
                name: true,
                hospitalName: true,
                email: true,

            },
            orderBy: { name: 'asc' }
        });

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
                where: {
                    email: findEmail
                }
            });

        if (!foundUser) {
            return res.status(400).json({ message: 'User not found.' });
        }

        return res.status(200).json(foundUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server failed.' });
    }
}

const deactivateUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        await prisma.user.update({
            where: { email },
            data: {
                active: false,
            },
        });

        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server failed.', error });
    }
};

const reactivateUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        await prisma.user.update({
            where: { email },
            data: {
                active: true,
            },
        });

        return res.status(200).json({ message: 'User activated successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server failed.', error });
    }
}

export default { listUsers, findUser, deactivateUser, reactivateUser }