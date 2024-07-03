import MenuIcon from "./Icon/Menu";
import IconList from "./IconList";

const SideBar = () => {
  return (
    <aside
      className="tablet:min-w-[80px] tablet:h-screen tablet:flex tablet:flex-col tablet:justify-between tablet:items-center tablet:bg-white tablet:p-4 tablet:shadow-lg tablet:py-8 tablet:fixed
                     fixed bottom-0 w-full bg-white flex flex-row items-center justify-around p-2 tablet:w-auto overflow-x-hidden"
    >
      <div className="hidden tablet:block">로고자리</div>
      <IconList />
      <MenuIcon />
    </aside>
  );
};

export default SideBar;
