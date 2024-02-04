import { FileRoute, Link } from "@tanstack/react-router";
import { buildQueryOptions } from "../../libs/query";
import { getOrganizations } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Page } from "../../components/Page";
import { Avatar, AvatarFallback } from "../../components/ui/Avatar";
import { buttonVariants } from "../../components/ui/Button";

const Organizations: React.FunctionComponent = () => {
  const {
    data: { data: organizations = [] },
  } = useSuspenseQuery(buildQueryOptions(getOrganizations));
  return (
    <Page
      title="Organizations"
      subTitle="List of all organizations"
      action={
        <Link
          to="/organizations/create"
          className={buttonVariants({ variant: "default" })}
        >
          Create
        </Link>
      }
    >
      <div className="space-y-3">
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            className="flex"
            to="/organizations/$id"
            params={{ id: organization.id.toString() }}
          >
            <>
              <div>
                <Avatar>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-2">
                <h3 className="font-medium text-gray-600">
                  {organization.name}
                </h3>
                <p className="text-sm">{organization.description}</p>
              </div>
            </>
          </Link>
        ))}
      </div>
    </Page>
  );
};

export const Route = new FileRoute("/organizations/").createRoute({
  component: Organizations,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(buildQueryOptions(getOrganizations)),
});
