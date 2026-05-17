/**
 * Better Auth client for React Native.
 *
 * Uses the `better-auth/client` package which works in non-browser runtimes.
 * The baseURL is set to the same backend API that the Next.js web app uses,
 * so the mobile app shares the same auth sessions and user data.
 */

import { createAuthClient } from "better-auth/client";
import { ENV } from "@/constants/env";

export const authClient = createAuthClient({
  baseURL: ENV.API_URL,
});

export type Session = NonNullable<
  Awaited<ReturnType<typeof authClient.getSession>>["data"]
>;