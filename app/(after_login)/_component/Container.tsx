import { ChildrenProps } from "./types";

const Container = ({ children }: ChildrenProps) => {
  return (
    <div className="w-[620px] min-w-[437px] flex flex-col p-[2rem] h-full bg-blue-300 border">
      {children}
    </div>
  );
};

export default Container;
