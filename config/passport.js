import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { models } from "@/database/models";



passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          // Find the user with the provided email
          const user = await models.Users.findOne({ where: { email} });
  
          // If the user doesn't exist or the password is incorrect, return false
        //   if (!user || !(await bcrypt.compare(password, user.password))) {
          if (!user) {
            return done(null, false, {message: "Incorrect Email"});
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if(!passwordMatch) {
            return done(null, false, {message: "Incorrect Password"});

          }
          // If the user exists and the password is correct, return the user
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await models.Users.findByPk(id);
    // const user = await models.Users.fin
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
