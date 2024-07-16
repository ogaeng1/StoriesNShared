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

  return (
    <div>
      <div>팔로워 목록</div>
      <ul>
        {follower && follower.length > 0 ? (
          follower.map((user) => (
            <li key={user.id} className="flex items-center">
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
          <p>팔로잉 목록이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default FollowerList;
