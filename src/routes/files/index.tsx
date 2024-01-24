import { FileRoute } from "@tanstack/react-router";

const Files: React.FunctionComponent = () => {
  return <div>Files</div>;
};

export const Route = new FileRoute("/files/").createRoute({
  component: Files,
});
