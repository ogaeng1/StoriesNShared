import MenuIcon from "./Icon/Menu";
import IconList from "./IconList";

const SideBar = () => {
  return (
    <aside className="min-w-[80px] h-screen flex flex-col justify-between items-center bg-white p-4 shadow-lg py-8 fixed">
      <div>로고자리</div>
      <IconList />
      <MenuIcon />
    </aside>
  );
};

export default SideBar;
