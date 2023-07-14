import { ReactNode } from "react";
import { BiSend } from "react-icons/bi";

type IconProps = {
  icon: ReactNode;
  text: string;
  styles?: string;
};

export default function Icon({ icon, text, styles = "" }: IconProps) {
  return (
    <>
      <div
        className={`badge w-[30%] text-center justify-center items-center flex gap-2 p-3 ${styles}`}
      >
        <div className="text-eyad text-lg">{icon}</div>
        <p className="text-md">{text}</p>
      </div>
    </>
  );
}
