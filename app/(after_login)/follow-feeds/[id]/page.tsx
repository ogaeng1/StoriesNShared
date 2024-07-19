import SideBar from "@/components/Sidebar";
import Container from "../../_component/Container";
import CurLoginUser from "../_component/CurLoginUser";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
  useQuery,
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
      <div className="flex min-w-[438px] min-h-[100vh] h-full overflow-x-hidden">
        <SideBar />
        <div className="flex-1 flex items-center justify-center">
          <Container>
            <CurLoginUser />
          </Container>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default FollowFeedPage;
