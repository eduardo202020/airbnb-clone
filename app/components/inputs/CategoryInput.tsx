import React from "react";
import { IconBase, IconType } from "react-icons";

type Props = {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
};

const CategoryInput = ({ onClick, label, selected, icon: Icon }: Props) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-rose-900 transition cursor-pointer  duration-150
    ${selected ? "border-rose-500" : "border-neutral-700"}
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
