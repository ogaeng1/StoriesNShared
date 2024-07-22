import SideBar from "@/components/Sidebar";
import Container from "../../_component/Container";
import ChattingRoom from "../_component/ChattingRoom";

const ChatList = async () => {
  return (
    <div className="flex min-w-[438px] min-h-[100vh] h-full overflow-x-hidden">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <ChattingRoom />
        </Container>
      </div>
    </div>
  );
};

export default ChatList;
