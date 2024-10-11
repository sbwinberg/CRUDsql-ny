import {prisma} from '../prismaclient/prismaclient'
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import passport from "passport";


passport.use(new LocalStrategy(

    async function (email, password, done) {
        console.log('Vi kör localstrategy')
        // Hitta användaren i databasen med användarnamnet
        const user = await prisma.user.findUnique({
            where: {email: email},
        })
           if (!user) {
               // Om användaren inte finns
               console.log('no user found')
               return done(null, false, { message: 'Incorrect username.' });
            }

            // Jämför inmatat lösenord med det hasade lösenordet i databasen
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) { return done(err); }
                if (!isMatch) {
                    // Om lösenordet inte matchar
                    console.log('wrong password')
                    return done(null, false, { message: 'Incorrect password.' });
                }

                // Om allt stämmer, autentisera användaren
                return done(null, user);
            });
        })
);
