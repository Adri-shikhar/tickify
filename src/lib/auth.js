// Sets up better-auth with MongoDB and adds a "role" field to every user
import { betterAuth } from "better-auth";
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
      // "user" by default; vendors register with role: "vendor"
      role: { type: "string", default: "user", index: true },
    },
  },
});
