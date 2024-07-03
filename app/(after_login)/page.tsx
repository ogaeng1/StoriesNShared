import { Suspense } from "react";
import Main from "./_component/Main";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  );
}
