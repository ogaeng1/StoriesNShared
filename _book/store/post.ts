import { create } from "zustand";

interface PostProps {
  id: string;
  userId: string;
  content: string;
  postImg: string[];
  commentCount: number;
  likeCount: number;
  setId: (id: string) => void;
  setUserId: (userId: string) => void;
  setContent: (content: string) => void;
  setPostImg: (postImg: string[]) => void;
  setCommentCount: (commentCount: number) => void;
  setLikeCount: (likeCount: number) => void;
}

const usePost = create<PostProps>((set) => ({
  id: "",
  userId: "",
  content: "",
  postImg: [],
  commentCount: 0,
  likeCount: 0,

  setId: (id: string) => set({ id }),
  setUserId: (userId: string) => set({ userId }),
  setContent: (content: string) => set({ content }),
  setPostImg: (postImg: string[]) => set({ postImg }),
  setCommentCount: (commentCount: number) => set({ commentCount }),
  setLikeCount: (likeCount: number) => set({ likeCount }),
}));

export default usePost;
