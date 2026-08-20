import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000",
  plugins: [
    emailOTPClient(),
    inferAdditionalFields({
      user: {
        role: { type: "string" },
      },
    }),
  ],
});

export const { signIn, signUp, useSession } = authClient;
