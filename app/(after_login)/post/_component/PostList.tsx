import { useQuery } from "@tanstack/react-query";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import PostCard from "./PostCard";
import { Feed } from "./types";

const PostList = () => {
  const getPosts = async (): Promise<Feed[]> => {
    const postsCollection = collection(db, "feeds");
    const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(postsQuery);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Feed[];
    return posts;
  };

  const { data } = useQuery({
    queryKey: ["feeds"],
    queryFn: getPosts,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return <PostCard data={data} />;
};

export default PostList;
