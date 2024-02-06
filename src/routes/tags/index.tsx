import { FileRoute, Link } from "@tanstack/react-router";
import { buildQueryOptions } from "../../libs/query";
import {  getTags } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Page } from "../../components/Page";
import { Avatar, AvatarFallback } from "../../components/ui/Avatar";
import { buttonVariants } from "../../components/ui/Button";

const Tags: React.FunctionComponent = () => {
  const {
    data: { data: tags = [] },
  } = useSuspenseQuery(buildQueryOptions(getTags));
  return (
    <Page
      title="Tags"
      subTitle="List of all tags"
      action={
        <Link
          to="/tags/create"
          className={buttonVariants({ variant: "default" })}
        >
          Create
        </Link>
      }
    >
      <div className="space-y-3">
        {tags.map((tag) => (
          <div key={tag.id} className="flex">
            <div>
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-2">
              <h3 className="font-medium text-gray-600">{tag.name}</h3>
              
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export const Route = new FileRoute("/tags/").createRoute({
  component: Tags,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(buildQueryOptions(getTags)),
});
