import { Stack } from "expo-router";

/**
 * Layout for unauthenticated screens (login, register).
 */
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}