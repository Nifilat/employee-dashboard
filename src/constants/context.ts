import { createContext } from "react";
import type { AuthUser } from "@/context/types";

export const AuthContext = createContext<{
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}>({
  user: null,
  loading: true,
  logout: async () => {},
});