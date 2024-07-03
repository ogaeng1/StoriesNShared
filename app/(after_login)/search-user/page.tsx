import SideBar from "@/components/Sidebar";
import Search from "./_component/Search";
import Container from "../_component/Container";

const SearchingUser = () => {
  return (
    <div className="flex min-w-[438px] min-h-[100vh] h-full overflow-x-hidden">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <Search />
        </Container>
      </div>
    </div>
  );
};

export default SearchingUser;
