import { PrismaClient } from '@prisma/client';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express"; // används i utkommenterad kod längst ned

//Types
import { User } from "../types/types"; // används i utkommenterad kod längst ned

const prisma = new PrismaClient();

// Här definerar vi vår strategy för passport, I detta fall använder vi LocalStrategy.
// Vi kan använda oss av flera strategys samtidigt, som tex Oauth med google, facebook, discord osv.
passport.use(
  new LocalStrategy(async (useremail, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: useremail }
      });

      if (!user) return done(null, false, { message: "Incorrect useremail" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return done(null, false, { message: "Incorrect password, or pw dont match with user" });

      return done(null, { id: user.id, username: user.name });
    } catch (error) {
      return done(error);
    }
  })
);

// serializeUser används för att spara vår user id i vår session då vi i detta fall
// kombinerar express-sessions med passport.js
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

//deserializeUser använder vi för att hämta vårt user object från vår sparade session.
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { id: true, name: true }
    });

    console.log("deserialize user", user);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// export function authorize(...allowed: string[]) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     console.log("user from authorize:", req.user);
//     console.log("allowed:", allowed);
//     const user = req.user as User | undefined;
//     if (req.isAuthenticated() && user && allowed.includes(user.role)) {
//       next();
//     } else {
//       res.status(403).json({ message: "unauthorized" });
//     }
//   };
// }

export default passport;
