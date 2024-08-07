"use client";

import Link from "next/link";

const Error = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-2 text-white">
        <div>존재하지 않는 유저입니다.</div>
        <Link href="/" className="border p-2 rounded-lg">
          돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Error;
