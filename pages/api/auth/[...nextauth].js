import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
// ----------------------------------------

import { getServer } from "@/config";
import { models } from "@/database/models";
const { sequelize } = models;

try {
  const sqlAuth = async () => {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  };
  sqlAuth();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// -----------------------------------------
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const res = await fetch(`${getServer}/api/Login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        });
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) return user;
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  pages: {
    signIn: "/"
  },
  secret: "@getPills134*",
  callbacks: {
    async jwt({ token, user }) {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.tel = user.tel;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.id = token.id;
        session.user.role = token.role;
        session.user.tel = token.tel;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60 // 24hrs
  },
  jwt: {
    secret: "@getPills134*",
    encryption: true
  },
  adapter: SequelizeAdapter(sequelize)
});
