import { useQuery } from "@tanstack/react-query";
import { getFollowerList } from "@/utils/getFollowList";
import { useParams } from "next/navigation";
import Image from "next/image";

const FollowerList = () => {
  const { id } = useParams();

  const {
    data: follower,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["follower", id],
    queryFn: () => getFollowerList(id as string),
  });

  if (isLoading) {
    <div className="flex justify-center items-center">불러오는중..</div>;
  }

  return (
    <div>
      <div className="text-center font-bold mb-3">팔로워</div>
      <ul className="flex flex-col gap-2">
        {follower && follower.length > 0 ? (
          follower.map((user) => (
            <li key={user.id} className="flex items-center gap-1">
              <Image
                src={user.profileImg}
                alt={user.nickname}
                width={32}
                height={32}
              />
              <p>{user.nickname}</p>
            </li>
          ))
        ) : (
          <p>팔로워 목록이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default FollowerList;
