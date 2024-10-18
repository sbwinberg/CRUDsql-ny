import {prisma} from '../prismaclient/prismaclient'
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import passport from "passport";


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) {
        console.log('Vi kör localstrategy')
        console.log(typeof email, typeof password)

        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!user) {
            // Om användaren inte finns
            console.log('no user found')
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Jämför inmatat lösenord med det hasade lösenordet i databasen
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) { 
                console.log(password, user.password)
                return done(err); 
            }
            if (!isMatch) {
                // Om lösenordet inte matchar
                console.log('wrong password')
                return done(null, false, { message: 'Incorrect password.' });
            }

        // Om allt stämmer, autentisera användaren
        });
        return done(null, user);
    })
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: { id: true, email: true, name: true },
        });
        if (user) {
            done(null, user);
        } else {
            done(new Error("User not found"), null);
        }
    } catch (error) {
        done(error, null);
    }
});

export default passport