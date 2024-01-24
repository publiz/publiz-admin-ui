import { FileRoute } from "@tanstack/react-router";

const Posts: React.FunctionComponent = () => {
  return <div>Posts</div>;
};

export const Route = new FileRoute("/posts/").createRoute({
  component: Posts,
});
