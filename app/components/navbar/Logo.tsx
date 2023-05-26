"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <Image
        onClick={() => router.push("/")}
        alt="logo"
        className="hidden md:block cursor-pointer w-auto"
        height="100"
        width="100"
        src="/images/logo.png"
        priority
      />
      <div className=" md:hidden cursor-pointer rounded-full bg-rose-500 p-1 w-12 auto flex justify-center flex-row">
        <Image
          onClick={() => router.push("/")}
          alt="icon"
          className="  "
          height="25"
          width="25"
          src="/images/icon.png"
          priority
        />
      </div>
    </>
  );
};

export default Logo;
