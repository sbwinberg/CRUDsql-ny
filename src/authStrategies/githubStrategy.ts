// // import { func } from "joi";

// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;

// export interface UserProfile {
//   id: string;
//   username: string;
//   displayName: string;
//   profileUrl: string;
//   emails: Array<{ value: string }>;
// }

// passport.use(new GitHubStrategy({
//   clientID: 'GITHUB_CLIENT_ID',
//   clientSecret: 'GITHUB_CLIENT_SECRET',
//   callbackURL: "http://localhost:1337/auth/github/callback"
// },
//   function (accessToken: string, refreshToken: string, profile: any, done:(err: any, user?: UserProfile | null) => void) => {
  
//     try {
//       const user: UserProfile = {
//         id: profile.id,
//         username: profile.username || profile.displayName,
//         displayName: profile.displayName,
//         profileUrl: profile.profileUrl,
//         emails: profile.emails || []
//       };
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

// Definiera interfacet för UserProfile
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  profileUrl: string;
  emails: Array<{ value: string }>;
}

// Använd GitHub-strategin
passport.use(new GitHubStrategy({
  clientID: 'GITHUB_CLIENT_ID', // Byt ut mot din riktiga client ID
  clientSecret: 'GITHUB_CLIENT_SECRET', // Byt ut mot din riktiga client secret
  callbackURL: "http://localhost:1337/auth/github/callback"
},
  (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: UserProfile | null) => void) => {
    try {
      // Logga profil för felsökning
      console.log(profile);

      const user: UserProfile = {
        id: profile.id,
        username: profile.username || profile.displayName,
        displayName: profile.displayName,
        profileUrl: profile.profileUrl || '', // Kontrollera att detta finns
        emails: profile.emails || [] // Kontrollera att detta finns
      };

      return done(null, user); // Skicka den skapade användaren
    } catch (err) {
      console.error('Error during authentication', err);
      return done(err); // Skicka fel
    }
  }
));
