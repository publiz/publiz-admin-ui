import { FileRoute } from "@tanstack/react-router";

const MetaSchemas: React.FunctionComponent = () => {
  return <div>Meta Schemas</div>;
};

export const Route = new FileRoute("/meta-schemas/").createRoute({
  component: MetaSchemas,
});
