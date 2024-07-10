"use client";

import Textarea from "@/components/UI/Textarea";
import usePost from "@/store/post";
import Image from "next/image";
import Button from "@/components/UI/Button";
import { MdOutlineCancel } from "react-icons/md";
import { PutProps } from "./types";
import { FormEvent, useEffect, useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebase";
import { notify } from "@/components/UI/Toast";

type Props = { putModal: boolean; setPutModal: (putModal: boolean) => void };

const PostUpdateModal = ({
  postId,
  postImg,
  defaultContent,
  putModal,
  setPutModal,
}: PutProps & Props) => {
  const { content, setContent, setPostImg } = usePost();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    setContent(defaultContent);
    setExistingImages(postImg);
  }, [defaultContent, postImg, setContent]);

  const postImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const totalImages =
        existingImages.length + selectedImages.length + files.length;

      if (totalImages > 5) {
        notify("error", "5장까지 선택 가능합니다.");
        return;
      }

      setSelectedImages((prevImages) => [...prevImages, ...files]);
      const newImages = [
        ...existingImages,
        ...files.map((file) => URL.createObjectURL(file)),
      ];
      setPostImg(newImages);
    }
  };

  const removeImage = (index: number) => {
    if (index < existingImages.length) {
      const newExistingImages = existingImages.filter((_, i) => i !== index);
      setExistingImages(newExistingImages);
      setPostImg(newExistingImages);
    } else {
      const newSelectedImages = selectedImages.filter(
        (_, i) => i !== index - existingImages.length
      );
      setSelectedImages(newSelectedImages);
      const newImages = [
        ...existingImages,
        ...newSelectedImages.map((file) => URL.createObjectURL(file)),
      ];
      setPostImg(newImages);
    }
  };

  const updatePost = async (updatedPost: any) => {
    const docRef = doc(db, "feeds", postId);

    const deleteImagePromises = postImg
      .filter((img) => !existingImages.includes(img))
      .map((img) => {
        const imgRef = ref(storage, img);
        return deleteObject(imgRef);
      });
    await Promise.all(deleteImagePromises);

    const imageUrls = await Promise.all(
      selectedImages.map(async (file) => {
        const storageRef = ref(storage, `feed_image/${postId}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      })
    );

    const finalPostImg = [...existingImages, ...imageUrls];

    await updateDoc(docRef, {
      ...updatedPost,
      postImg: finalPostImg,
      updatedAt: serverTimestamp(),
    });
  };

  const { mutate } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      setContent("");
      setPostImg([]);
      setSelectedImages([]);
      setPutModal(false);
      notify("success", "게시글이 수정되었습니다.");
    },
  });

  const postUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) {
      alert("내용을 입력해 주세요.");
      return;
    }

    const updatedPostData = {
      content,
      postImg: existingImages,
    };

    mutate(updatedPostData);
  };

  return (
    <div className="z-[9999] fixed w-[100vw] h-screen flex justify-center items-center top-0 left-0 right-0 bottom-0">
      <form
        className="h-[680px] max-w-[620px] min-w-[437px] p-[2rem] border rounded-md bg-blue-200 flex flex-col"
        onSubmit={postUpdate}
      >
        <div className="flex justify-end">
          <Button onClick={() => setPutModal(!putModal)}>❌</Button>
        </div>
        <Textarea
          className="h-[270px] my-2"
          placeholder="나의 이야기를 공유해 보세요."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex gap-3">
          {existingImages.map((img, idx) => (
            <div key={img} className="relative w-[64px] h-[64px] rounded-md">
              <Image
                src={img}
                alt="업로드 이미지"
                width={64}
                height={64}
                className="rounded-md w-[64px] h-[64px]"
              />
              <Button variant="selectImgDel" onClick={() => removeImage(idx)}>
                <MdOutlineCancel />
              </Button>
            </div>
          ))}
          {selectedImages.map((file, idx) => (
            <div
              key={URL.createObjectURL(file)}
              className="relative w-[64px] h-[64px] rounded-md"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt="업로드 이미지"
                width={64}
                height={64}
                className="rounded-md w-[64px] h-[64px]"
              />
              <Button
                variant="selectImgDel"
                onClick={() => removeImage(existingImages.length + idx)}
              >
                <MdOutlineCancel />
              </Button>
            </div>
          ))}
        </div>
        <label
          htmlFor="profile-img"
          className="flex justify-center border rounded p-1 hover:cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-img"
            onChange={postImgUpload}
          />
          📷 사진 올리기
        </label>
        <Button type="submit" className="h-10 border mt-5">
          수정
        </Button>
      </form>
    </div>
  );
};

export default PostUpdateModal;
