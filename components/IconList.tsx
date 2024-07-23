import ChatIcon from "./Icon/Chat";
import FollowingIcon from "./Icon/Following";
import HomeIcon from "./Icon/Home";
import MenuIcon from "./Icon/Menu";
import SearchIcon from "./Icon/Search";
import UserIcon from "./Icon/User";

const IconList = () => {
  const icon = [
    { component: <HomeIcon />, name: "home" },
    { component: <SearchIcon />, name: "search" },
    { component: <FollowingIcon />, name: "following" },
    { component: <ChatIcon />, name: "chat" },
    { component: <UserIcon />, name: "user" },
    { component: <MenuIcon />, name: "menu" },
  ];

  return (
    <ul className="w-full flex gap-5 justify-center text-white">
      {icon.map((icon) => (
        <li key={icon.name}>{icon.component}</li>
      ))}
    </ul>
  );
};

export default IconList;
