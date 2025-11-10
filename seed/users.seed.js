import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createDummyUser = async (req, res) => {
    try {
        const users = [
            {
                email: "luizs@example.com",
                name: "Luiz",
                password: "asdf",
                role: "DONOR",
                location: "-23.55052,-46.633308",
                bloodGroup: "O_POSITIVE",
                isAdmin: true,
                createdAt: new Date("2025-11-10T04:06:07.796Z"),
                active: true
            },
            {
                email: "maria@example.com",
                name: "Maria",
                password: "asdf",
                role: "DONOR",
                location: "-22.9068,-43.1729",
                bloodGroup: "A_POSITIVE",
                isAdmin: false,
                createdAt: new Date(),
                active: true
            },
            {
                email: "pedro@example.com",
                name: "Pedro",
                password: "asdf",
                role: "DONOR",
                location: "-19.9167,-43.9345",
                bloodGroup: "B_NEGATIVE",
                isAdmin: false,
                createdAt: new Date(),
                active: true
            }
        ];
        const salt = await bcrypt.genSalt(10);
        let hashPassword;

        users.forEach(async user => {
            hashPassword = await bcrypt.hash(user.password, salt);

            user.password = hashPassword;
        });

        await prisma.user.createMany({ data: users });

        res.status(200).json({ message: 'Added dummy users' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server issue.' });
    }
}

export default createDummyUser;