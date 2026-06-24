// Sets up better-auth with MongoDB
import { betterAuth } from "better-auth";
import { getOAuthState } from "better-auth/api";
import { customSession } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { z } from "zod";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Tickify");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
    },
  },
  database: mongodbAdapter(db, { client }),
  user: {
    additionalFields: {
      // role can be sent from the sign-up form (email or Google)
      role: {
        type: "string",
        defaultValue: "user",
        input: true,
        validator: {
          input: z.enum(["user", "vendor"]),
        },
      },
      isFraud: { type: "boolean", defaultValue: false, input: false },
    },
  },
  // When user signs up with Google, save the role from additionalData
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const googleData = await getOAuthState();

          if (googleData?.role === "vendor") {
            return { data: { ...user, role: "vendor" } };
          }

          return { data: user };
        },
      },
    },
  },
  plugins: [
    customSession(async ({ user, session }) => ({
      user: { ...user, role: user.role ?? "user" },
      session,
    })),
  ],
});
