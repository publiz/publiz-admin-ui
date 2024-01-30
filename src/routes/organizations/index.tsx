import { FileRoute, Link } from "@tanstack/react-router";
import { buildQueryOptions } from "../../libs/query";
import { getOrganizations } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Page } from "../../components/Page";

const Organizations: React.FunctionComponent = () => {
  const {
    data: { data: organizations = [] },
  } = useSuspenseQuery(buildQueryOptions(getOrganizations));
  return (
    <Page
      title="Organizations"
      subTitle="List of all organizations"
      action={<Link to="/organizations/create">Create</Link>}
    >
      {organizations.map((organization) => (
        <div key={organization.id}>
          <h3 className="font-medium text-gray-600">{organization.name}</h3>
          <p className="text-sm">{organization.description}</p>
        </div>
      ))}
    </Page>
  );
};

export const Route = new FileRoute("/organizations/").createRoute({
  component: Organizations,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(buildQueryOptions(getOrganizations)),
});
