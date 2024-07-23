import CurLoginUser from "../_component/CurLoginUser";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { getFollowingList } from "@/utils/getFollowList";

type Props = { params: { id: string } };

const FollowFeedPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  const id = params.id;

  await queryClient.prefetchQuery({
    queryKey: ["following", id],
    queryFn: () => getFollowingList(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CurLoginUser />
    </HydrationBoundary>
  );
};

export default FollowFeedPage;
