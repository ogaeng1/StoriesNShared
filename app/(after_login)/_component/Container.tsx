import { ChildrenProps } from "./types";

const Container = ({ children }: ChildrenProps) => {
  return (
    <div className="w-full max-w-[598px] min-w-[437px] flex flex-col p-[2rem] min-h-[100vh] bg-blue-300 border">
      {children}
    </div>
  );
};

export default Container;
