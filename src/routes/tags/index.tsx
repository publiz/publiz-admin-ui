import { FileRoute } from "@tanstack/react-router";

const Tags: React.FunctionComponent = () => {
  return <div>Tags</div>;
};

export const Route = new FileRoute("/tags/").createRoute({
  component: Tags,
});
