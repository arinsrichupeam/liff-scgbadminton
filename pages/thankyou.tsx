import React from "react";
import Logo from "../components/logo";
import Image from "next/image";
import thankPic from "../public/img/thankyou.png";

export default function thankYou() {
  return (
    <div className="flex min-h-full items-center justify-center h-screen pl-10 pr-10 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" text-center w-full max-w-md space-y-8">
        <Logo></Logo>
        <Image
          className="inline"
          src={thankPic}
          alt="Logo"
          width={0}
          height={0}
          priority
        />
      </div>
    </div>
  );
}
