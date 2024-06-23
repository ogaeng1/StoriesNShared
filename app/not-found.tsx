import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div>페이지를 찾을 수 없습니다.</div>
        <Link href="/" className="border p-2">
          돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
