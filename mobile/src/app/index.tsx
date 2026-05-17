import { Redirect } from "expo-router";
import { useAuth } from "@/lib/auth-context";

/**
 * Root screen — redirects to the tab layout if authenticated,
 * otherwise to the login screen.
 */
export default function Index() {
  const { session, isPending } = useAuth();

  if (isPending) {
    return null; // splash while restoring session
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}