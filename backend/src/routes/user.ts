import { Router, Request } from "express";
import { RequestUser } from "../types/types";
import { prisma } from "../prismaclient/prismaclient";
import { userSchema } from "../schema/user-schema";

export const router = Router();

router.get("/", async (req, res) => {
  try {
      const allUsers = await prisma.user.findMany();
      res.json(allUsers);
  }
  catch (error) {
      res.status(400).json({ error: "Unable to get all users" });
  }
});

router.post("/", async (req: Request<{}, {}, RequestUser>, res) => {
  try {
      const { name, email, password } = req.body;
      const { error } = userSchema.validate({name, email, password});
      if(error) res.status(400).json({ error: error.details });

      const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password
        }
      });
      res.json(newUser);
  }
  catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Unable to create user" });
  }
});

router.put("/:id", async (req: Request<{id: string}, {}, Partial<RequestUser>>, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, password }
    });
    
    res.json(updatedUser);
  } catch (error) {
    console.error("Fel vid uppdatering av användare:", error);
    res.status(400).json({ error: "Kunde inte uppdatera användaren" });
  }
});

router.delete("/:id", async (req: Request<{id: string}>, res) => {
  try {
    const { id } = req.params;
    
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error("Fel vid borttagning av användare:", error);
    res.status(400).json({ error: "Kunde inte ta bort användaren" });
  }
});
