import { Suspense } from "react";
import Main from "./_component/Main";
import Loading from "./loading";

type ChildrenProps = {
  children?: React.ReactNode;
};

export default function Home({ children }: ChildrenProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Main>{children}</Main>
    </Suspense>
  );
}
