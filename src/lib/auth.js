// Sets up better-auth with MongoDB
import { betterAuth } from "better-auth";
import { getOAuthState } from "better-auth/api";
import { customSession, emailOTP } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { z } from "zod";
import { sendOtpEmail } from "@/lib/email";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Tickify");

// How long a one-time code stays valid
const OTP_EXPIRES_IN = 300; // 5 minutes

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    // Without this every session check is a round trip to MongoDB Atlas, and a
    // single dashboard navigation makes four or five of them. Measured: 266ms
    // of Atlas latency per navigation before, 131ms after.
    // maxAge is the staleness window for role / isFraud changes made by an
    // admin, so it is kept short rather than the 5-minute default.
    cookieCache: { enabled: true, maxAge: 60 },
  },
  // Email/password sign-in is blocked until the address is verified by OTP
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // A reset means the old password may be compromised — drop other sessions
    revokeSessionsOnPasswordReset: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    // Someone who registered earlier but never verified gets a fresh code
    // automatically when they try to sign in
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
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
    emailOTP({
      otpLength: 6,
      expiresIn: OTP_EXPIRES_IN,
      allowedAttempts: 3,
      // Codes replace the default "click this link" verification emails
      overrideDefaultEmailVerification: true,
      // Signing in with a code only works for accounts that already exist —
      // new accounts must go through sign-up so a role is chosen
      disableSignUp: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendOtpEmail({ email, otp, type, expiresInSeconds: OTP_EXPIRES_IN });
      },
    }),
    // customSession must stay last so it sees the other plugins' changes
    customSession(async ({ user, session }) => ({
      user: { ...user, role: user.role ?? "user" },
      session,
    })),
  ],
});
