// Sets up better-auth with MongoDB and adds a "role" field to every user
import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Tickify");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  database: mongodbAdapter(db, { client }),
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "user", input: false },
      isFraud: { type: "boolean", defaultValue: false, input: false },
    },
  },
  plugins: [
    customSession(async ({ user, session }) => ({
      user: { ...user, role: user.role ?? "user" },
      session,
    })),
  ],
});
