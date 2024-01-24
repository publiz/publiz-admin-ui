import { FileRoute } from "@tanstack/react-router";

const Users: React.FunctionComponent = () => {
  return <div>Users</div>;
};

export const Route = new FileRoute("/users/").createRoute({
  component: Users,
});
