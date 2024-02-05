import { FileRoute } from "@tanstack/react-router";
import { Page } from "../../components/Page";
import { buildQueryOptions } from "../../libs/query";
import { getOrganizationById } from "../../api/publiz";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CreateOrganizationForm } from "../../components/organization/CreateOrganizationForm";

const OrganizationDetails: React.FunctionComponent = () => {
  const params = Route.useParams();
  const { data: { data: organization } = {} } = useSuspenseQuery(
    buildQueryOptions(() => getOrganizationById(+params.id))
  );

  return (
    <Page title="Organization details">
      {organization && <CreateOrganizationForm organization={organization} />}
    </Page>
  );
};

export const Route = new FileRoute("/organizations/$id").createRoute({
  component: OrganizationDetails,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      buildQueryOptions(() => getOrganizationById(+params.id))
    ),
});
