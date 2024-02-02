import { FileRoute } from "@tanstack/react-router";
import { Page } from "../../components/Page";
import { CreateTagForm } from "../../components/tag/CreateTagForm";

const CreateOrganization: React.FunctionComponent = () => {
  return (
    <Page title="Create Organization">
      <CreateTagForm />
    </Page>
  );
};

export const Route = new FileRoute("/tags/create").createRoute({
  component: CreateOrganization,
});
