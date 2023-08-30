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
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-[#5271FF] transition cursor-pointer  duration-150
    ${
      selected
        ? "border-[#5271FF] text-[#5271FF] bg-[#5271FF80]"
        : "border-neutral-700"
    }
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
