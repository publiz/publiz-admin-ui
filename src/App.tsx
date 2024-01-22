// Import the generated route tree
import { RouterProvider, Router } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const router = new Router({
  routeTree,
  context: {
    auth: undefined!,
    queryClient: undefined!,
  },
});
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App: React.FunctionComponent = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  return <RouterProvider router={router} context={{ auth, queryClient }} />;
};
