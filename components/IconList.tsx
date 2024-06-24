import ChatIcon from "./Icon/Chat";
import HeartIcon from "./Icon/Heart";
import HomeIcon from "./Icon/Home";
import SearchIcon from "./Icon/Search";
import UserIcon from "./Icon/User";

const IconList = () => {
  const icon = [
    { component: <HomeIcon />, name: "home" },
    { component: <SearchIcon />, name: "search" },
    { component: <ChatIcon />, name: "chat" },
    { component: <HeartIcon />, name: "heart" },
    { component: <UserIcon />, name: "user" },
  ];

  return (
    <ul className="flex flex-col items-center">
      {icon.map((icon) => (
        <li key={icon.name}>{icon.component}</li>
      ))}
    </ul>
  );
};

export default IconList;
