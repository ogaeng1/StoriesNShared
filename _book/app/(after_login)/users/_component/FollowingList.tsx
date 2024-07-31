import { useQuery } from "@tanstack/react-query";
import { getFollowingList } from "@/utils/getFollowList";
import { useParams } from "next/navigation";
import Image from "next/image";

const FollowingList = () => {
  const { id } = useParams();

  const {
    data: following,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["following", id],
    queryFn: () => getFollowingList(id as string),
  });

  return (
    <div>
      <h2 className="text-center font-bold mb-3">팔로잉</h2>
      <ul className="flex flex-col gap-2">
        {following && following.length > 0 ? (
          following.map((user) => (
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
          <p>팔로잉 목록이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default FollowingList;
