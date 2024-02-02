import { FileRoute } from "@tanstack/react-router";
import { buildQueryOptions } from "../../libs/query";
import { getUsers } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Page } from "../../components/Page";
import { Avatar, AvatarFallback } from "../../components/ui/Avatar";

const Users: React.FunctionComponent = () => {
  const {
    data: { data: users = [] },
  } = useSuspenseQuery(buildQueryOptions(getUsers));
  return (
    <Page
      title="Users"
      subTitle="List of all Users"
    >
      <div className="space-y-3">
        {users.map((users) => (
          <div key={users.id} className="flex">
            <div>
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-2">
              <h3 className="font-medium text-gray-600">{users.displayName}</h3>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export const Route = new FileRoute("/users/").createRoute({
  component: Users,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(buildQueryOptions(getUsers)),
});
