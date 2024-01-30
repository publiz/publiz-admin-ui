import { FileRoute } from "@tanstack/react-router";
import { Page } from "../../components/Page";
import { CreateOrganizationForm } from "../../components/organization/CreateOrganizationForm";

const CreateOrganization: React.FunctionComponent = () => {
  return (
    <Page title="Create Organization">
      <CreateOrganizationForm />
    </Page>
  );
};

export const Route = new FileRoute("/organizations/create").createRoute({
  component: CreateOrganization,
});
