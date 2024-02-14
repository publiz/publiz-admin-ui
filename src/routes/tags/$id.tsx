import { FileRoute } from "@tanstack/react-router";
import { Page } from "../../components/Page";
import { buildQueryOptions } from "../../libs/query";
import { getTagById } from "../../api/publiz";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CreateTagForm } from "../../components/tag/CreateTagForm";

const TagDetails: React.FunctionComponent = () => {
  const params = Route.useParams();
  const { data: { data: tag } = {} } = useSuspenseQuery(
    buildQueryOptions(() => getTagById(+params.id))
  );

  return (
    <Page title="Tag details">
      {tag && <CreateTagForm tag={tag} />}
    </Page>
  );
};

export const Route = new FileRoute("/tags/$id").createRoute({
  component: TagDetails,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      buildQueryOptions(() => getTagById(+params.id))
    ),
});
