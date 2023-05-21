"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="hidden md:block cursor-pointer w-auto"
      height="100"
      width="100"
      src="/images/logo.png"
      priority
    />
  );
};

export default Logo;
