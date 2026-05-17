/**
 * Auth context provider for the mobile app.
 *
 * Wraps the Better Auth client session hook into a React context so that
 * any screen can read the current session without prop-drilling.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authClient, type Session } from "@/api/auth-client";

interface AuthState {
  session: Session | null;
  isPending: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthState>({
  session: null,
  isPending: true,
  error: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    authClient
      .getSession()
      .then(({ data }) => {
        if (!cancelled) setSession(data ?? null);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsPending(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, isPending, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}