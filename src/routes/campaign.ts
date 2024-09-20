import express from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestCampaign } from "../types/types"

const prisma = new PrismaClient();
const router = express.Router()

// get all campaigns
router.get("/", async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    }
    catch (error) {
        res.status(400).json({ error: "Unable to get all users" });
    }
});

// get campaign by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const currentUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        currentUser ? res.status(200).json(currentUser) : res.status(404).json({ error: "User not found" });
    }
    catch (error) {
        res.status(400).json({ error: `can not get user with id: ${id}` })
    }
});

// create new campaign
router.post("/", async (req: Request<{}, {}, RequestCampaign>, res) => {
    try {
        const { companyName, companyDescription, productDescription, targetAudience, userId, user, emails } = req.body;
        const newCampaign = await prisma.campaign.create({
            data: {
                companyName,
                companyDescription,
                productDescription,
                targetAudience,
                userId,
                user: { connect: { id: userId } },
                emails
            }
        });
        res.json(newCampaign);
    }
    catch (error) {
        res.status(400).json({ error: "Unable to create user" });
    }
});

// update user after id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { name, email } = req.body;
        const updateUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email
            }
        })
        res.json(updateUser);
    }
    catch (error) {
        res.status(400).json({ error: `Unable to update user with id: ${id}` });
    }
});

// patch user after id
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    let currentUser;

    try {
        currentUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!currentUser) res.sendStatus(404).json({ error: `can not found user with id: ${id}` })

        currentUser = { ...req.body };
        const updateUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: currentUser?.name,
                email: currentUser?.email
            }
        })
        res.json(updateUser);
    }
    catch (error) {
        res.status(400).json({ error: `Unable to update user with id: ${id}` });
    }
});

// delete user by id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({ message: `user: "${deleteUser.name}" where deleted` });
    }
    catch (error) {
        res.status(400).json({ error: `Unable to delete user with id: "${id}"` });

    }
});

export { router as userRoutes } 
