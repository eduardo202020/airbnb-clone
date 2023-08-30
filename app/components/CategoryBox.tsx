"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import qs from "query-string";

import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  selected?: boolean;
};

const CategoryBox = ({ label, icon: Icon, selected }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  // crea y edita la url
  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // a la url actual le agrega la categoria actual
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // si la categoria ya esta en la url, estonces la borra de la url
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-[3px] hover:text-neutral-800 transition cursor-pointer 
    ${selected ? "border-[#1da1f2]" : "border-transparent"}
    ${selected ? "text-[#1da1f2]" : "text-neutral-500"}

    `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
