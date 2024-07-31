import { useQuery } from "@tanstack/react-query";
import { getPostDetailById } from "../getPostDetail";

export const useGetPost = (id: string) => {
  const { data: postDetail } = useQuery({
    queryKey: ["feeds", id],
    queryFn: getPostDetailById,
  });

  return { postDetail };
};
