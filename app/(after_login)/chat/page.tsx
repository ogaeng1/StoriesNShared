import SideBar from "@/components/Navbar";
import Container from "../_component/Container";
import SearchUser from "./_component/SearchUser";
import ChattingList from "./_component/ChattingList";

const ChatList = () => {
  return (
    <div className="flex min-w-[438px] min-h-[100vh] h-full overflow-x-hidden">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <SearchUser />
          <ChattingList />
        </Container>
      </div>
    </div>
  );
};

export default ChatList;
