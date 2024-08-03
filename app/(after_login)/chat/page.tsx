import Container from "../_component/Container";
import SearchUser from "./_component/SearchUser";
import ChattingList from "./_component/ChattingList";
import Navbar from "@/components/Navbar";

const ChatList = () => {
  return (
    <>
      <Navbar />
      <Container>
        <SearchUser />
        <ChattingList />
      </Container>
    </>
  );
};

export default ChatList;
