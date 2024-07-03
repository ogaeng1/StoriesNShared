export interface Posts {
  data: Feed[] | undefined;
}

export interface Feed {
  id: string;
  userProfileImg: string;
  userId: string;
  content: string;
  commentCount: number;
  likeCount: number;
  likeUser: string[];
  postImg: string[];
  comment: Comment[];
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export type Props = {
  postId: string;
  postImg: string[];
  defaultContent: string;
};

export type DelProps = Pick<Props, "postId" | "postImg">;
export type PutProps = Pick<Props, "postId" | "postImg" | "defaultContent">;

export type Comment = {
  profileImg: string;
  userId: string;
  content: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
};
