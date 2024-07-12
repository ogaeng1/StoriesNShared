import ChatIcon from "./Icon/Chat";
import FollowingIcon from "./Icon/Following";
import HomeIcon from "./Icon/Home";
import SearchIcon from "./Icon/Search";
import UserIcon from "./Icon/User";

const IconList = () => {
  const icon = [
    { component: <HomeIcon />, name: "home" },
    { component: <SearchIcon />, name: "search" },
    { component: <FollowingIcon />, name: "following" },
    { component: <ChatIcon />, name: "chat" },
    { component: <UserIcon />, name: "user" },
  ];

  return (
    <ul className="flex flex-row tablet:flex-col items-center justify-around w-full tablet:w-auto overflow-x-hidden">
      {icon.map((icon) => (
        <li key={icon.name}>{icon.component}</li>
      ))}
    </ul>
  );
};

export default IconList;
