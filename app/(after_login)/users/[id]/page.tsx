import { Suspense } from "react";
import UserExistValid from "../_component/UserExistValid";
import Loading from "../../loading";

const MyPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UserExistValid />
    </Suspense>
  );
};

export default MyPage;
