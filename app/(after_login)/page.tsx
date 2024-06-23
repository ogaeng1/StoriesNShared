import { Suspense } from "react";
import Main from "./_component/Main";
import Loading from "./loading";
import { ChildrenProps } from "./_component/types";

const Home = ({ children }: ChildrenProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <Main>{children}</Main>
    </Suspense>
  );
};

export default Home;
