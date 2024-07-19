import SideBar from "@/components/Sidebar";
import Container from "../../_component/Container";
import ChattingRoom from "../_component/ChattingRoom";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

const ChatList = async () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex min-w-[438px] min-h-[100vh] h-full overflow-x-hidden">
        <SideBar />
        <div className="flex-1 flex items-center justify-center">
          <Container>
            <ChattingRoom />
          </Container>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default ChatList;
