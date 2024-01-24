import { FileRoute } from "@tanstack/react-router";

const Home: React.FunctionComponent = () => {
  return <div>Home</div>;
};

export const Route = new FileRoute("/").createRoute({
  component: Home,
});
