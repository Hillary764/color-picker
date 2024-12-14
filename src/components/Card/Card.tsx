import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export default function Card({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={`relative p-1 flex justify-center items-center
            text-green-300
            before:absolute before:w-full before:h-full before:z-10
            before:bg-gradient-to-tr before:from-teal-500
             before:to-green-400 before:rounded-md 
             ${className ?? ""}`}
    >
      <div className="bg-slate-950 w-full z-20 h-full">{children}</div>
    </div>
  );
}
