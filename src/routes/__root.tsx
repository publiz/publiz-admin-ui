import { QueryClient } from "@tanstack/react-query";
import { Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { AuthContextState } from "../contexts/AuthContext";

export const Route = rootRouteWithContext<{
  auth: AuthContextState;
  queryClient: QueryClient;
}>()({
  component: Outlet,
});
