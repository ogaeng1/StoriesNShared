import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-primary">
      <div className="flex flex-col items-center gap-2 text-white">
        <div>페이지를 찾을 수 없습니다.</div>
        <Link href="/" className="border rounded-md p-2">
          돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
