/**
 * Environment configuration loaded from .env via expo-constants.
 *
 * In development, values come from the .env file at the mobile project root.
 * In production builds, they are embedded at build time via EAS Update / app.json extra.
 */
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const ENV = {
  /** Base URL of the Better Auth + REST backend (e.g. http://localhost:3000) */
  API_URL: (extra.API_URL as string) ?? process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
} as const;