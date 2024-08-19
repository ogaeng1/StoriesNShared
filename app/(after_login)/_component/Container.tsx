import { ChildrenProps } from "./types";

const Container = ({ children }: ChildrenProps) => {
  return (
    <div className="max-w-[598px] min-w-[437px] flex flex-col pt-[4rem] pb-[1rem] min-h-[100vh] text-white px-2">
      {children}
    </div>
  );
};

export default Container;
