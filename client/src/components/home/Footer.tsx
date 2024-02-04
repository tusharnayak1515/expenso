"use client";

import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className={`w-full h-fit] text-slate-200 p-6 
    flex flex-col justify-center items-center gap-4 bg-slate-900`}
    >
      <div className={`flex justify-start items-center gap-2`}>
        <Link href={"/"} className={`text-2xl font-bold cursor-pointer`}>
          Expenso
        </Link>
      </div>

      <p className={`text-center text-slate-400`}>
        Copyright © 2023 Expenso. All rights reserved
      </p>

      <div className={`flex justify-start items-center gap-8`}>
        <div className={`flex justify-start items-center gap-4`}>
          <FaFacebook className={`text-2xl cursor-pointer`} />
          <FaInstagram className={`text-2xl cursor-pointer`} />
          <FaLinkedin className={`text-2xl cursor-pointer`} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
