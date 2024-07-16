import SideBar from "@/components/Sidebar";
import Container from "../../_component/Container";
import CurLoginUser from "../_component/CurLoginUser";

const FollowFeedPage = () => {
  return (
    <div className="flex min-w-[438px] min-h-[100vh] h-full overflow-x-hidden">
      <SideBar />
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <CurLoginUser />
        </Container>
      </div>
    </div>
  );
};

export default FollowFeedPage;
