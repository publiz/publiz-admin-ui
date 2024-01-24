import { QueryClient } from "@tanstack/react-query";
import { rootRouteWithContext } from "@tanstack/react-router";
import { AuthContextState } from "../contexts/AuthContext";
import { EntryPoint } from "../components/EntryPoint";

export const Route = rootRouteWithContext<{
  auth: AuthContextState;
  queryClient: QueryClient;
}>()({
  component: EntryPoint,
});
