export type ChildrenProps = {
  children?: React.ReactNode;
};

export type PostProps = {
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
};

export type PostCreate = Omit<
  PostProps,
  | "id"
  | "setId"
  | "setUserId"
  | "setContent"
  | "setPostImg"
  | "setCommentCount"
  | "setLikeCount"
>;
