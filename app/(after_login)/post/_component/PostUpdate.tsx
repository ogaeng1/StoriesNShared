"use client";

import { useState } from "react";
import { PutProps } from "./types";
import Button from "@/components/UI/Button";
import PostUpdateModal from "./PostUpdateModal";

const PostUpdate = ({ postId, postImg, defaultContent }: PutProps) => {
  const [putModal, setPutModal] = useState(false);

  return (
    <>
      <Button onClick={() => setPutModal(!putModal)}>수정</Button>
      {putModal && (
        <PostUpdateModal
          postId={postId}
          postImg={postImg}
          defaultContent={defaultContent}
          putModal={putModal}
          setPutModal={setPutModal}
        />
      )}
    </>
  );
};

export default PostUpdate;
