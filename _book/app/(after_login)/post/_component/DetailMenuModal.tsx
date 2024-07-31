import PostDelete from "./PostDelete";
import PostUpdate from "./PostUpdate";
import { Props } from "./types";

const DetailMenuModal = ({ postId, postImg, defaultContent }: Props) => {
  return (
    <div className="w-[50px] h-[60px] border rounded flex flex-col items-center justify-center">
      <PostUpdate
        postId={postId}
        postImg={postImg}
        defaultContent={defaultContent}
      />
      <div className="w-full h-[0.5px] border"></div>
      <PostDelete postId={postId} postImg={postImg} />
    </div>
  );
};

export default DetailMenuModal;
