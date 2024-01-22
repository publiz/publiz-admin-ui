import { FileRoute } from "@tanstack/react-router";

const Organizations: React.FunctionComponent = () => {
  return <div>Organizations</div>;
};

export const Route = new FileRoute("/organizations/").createRoute({
  component: Organizations,
});
