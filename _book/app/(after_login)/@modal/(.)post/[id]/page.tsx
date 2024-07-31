import DetailModalContent from "@/app/(after_login)/post/_component/DetailModalContent";
import { getPostById } from "@/utils/getPostDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
  const queryClient = new QueryClient();
  const postId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ["feeds", postId],
    queryFn: getPostById,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailModalContent />
    </HydrationBoundary>
  );
}
