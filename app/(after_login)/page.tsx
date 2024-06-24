import { Suspense } from "react";
import Main from "./_component/Main";
import Loading from "./loading";

type Props = {
  params: { children: React.ReactNode };
};

export default function Home({ params }: Props) {
  const { children } = params;
  return (
    <Suspense fallback={<Loading />}>
      <Main>{children}</Main>
    </Suspense>
  );
}
