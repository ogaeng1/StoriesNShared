"use client";

import Textarea from "@/components/UI/Textarea";
import usePost from "@/store/post";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { PostCreate } from "../../_component/types";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "@/firebase/firebase";
import Image from "next/image";
import Button from "@/components/UI/Button";
import useModal from "@/store/modal";
import { onAuthStateChanged } from "firebase/auth";
import { MdOutlineCancel } from "react-icons/md";
import { notify } from "@/components/UI/Toast";
import Input from "@/components/UI/Input";

const NewModalForm = () => {
  const { content, postImg, setContent, setPostImg } = usePost();
  const { isOpen, setIsOpen } = useModal();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [userNickname, setUserNickname] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setUserNickname(userDoc.data().nickname || "");
          setUserProfileImg(userData.profileImg || "");
        }
      }
    });

    return () => unsubscribe();
  }, [userNickname]);

  const postImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (selectedImages.length + files.length > 5) {
        alert("이미지는 최대 5장까지 선택 가능합니다.");
        return;
      }
      setSelectedImages((prevImages) => [...prevImages, ...files]);
      const newImages = [
        ...postImg,
        ...files.map((file) => URL.createObjectURL(file)),
      ];
      setPostImg(newImages);
    }
  };

  const removeImage = (index: number) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newSelectedImages);

    const newPostImages = postImg.filter((_, i) => i !== index);
    setPostImg(newPostImages);
  };

  const addPost = async (post: PostCreate) => {
    const docRef = await addDoc(collection(db, "feeds"), {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const postId = docRef.id;
    const imageUrls = await Promise.all(
      selectedImages.map(async (file) => {
        const storageRef = ref(storage, `feed_image/${postId}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      })
    );

    await updateDoc(docRef, { postImg: imageUrls });
  };

  const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      setContent("");
      setPostImg([]);
      setSelectedImages([]);
      notify("success", "게시글이 등록되었습니다.");
    },
  });

  const postUpload = (e: FormEvent) => {
    e.preventDefault();

    if (!content) {
      notify("warning", "내용을 입력해주세요.");
      return;
    }

    const postData = {
      userId: userNickname,
      content,
      postImg,
      userProfileImg,
      commentCount: 0,
      comment: [],
      likeCount: 0,
      likeUser: [],
    };

    mutate(postData);
    setIsOpen(!isOpen);
  };

  return (
    <form
      className="min-w-[437px] p-[1rem] border rounded-md bg-secondary flex flex-col"
      onSubmit={postUpload}
    >
      <div className="text-white">
        <Button onClick={() => setIsOpen(!isOpen)}>✖</Button>
      </div>
      <Textarea
        className="h-[270px] my-2"
        placeholder="나의 이야기를 공유해 보세요."
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-3 my-2">
        {postImg.map((img, idx) => (
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
      </div>
      <label
        htmlFor="profile-img"
        className="flex justify-center border rounded p-1 hover:cursor-pointer text-white"
      >
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-img"
          onChange={postImgUpload}
        />
        사진 올리기
      </label>
      <Button type="submit" className="h-10 border mt-3 rounded-md text-white">
        확인
      </Button>
    </form>
  );
};

export default NewModalForm;
