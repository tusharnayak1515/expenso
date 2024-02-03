"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import ExpensoLogo from "../../../src/app/favicon.ico";

const Footer = () => {
  return (
    <div
      className={`w-full min-h-[calc(100vh-80px-70vh)] text-slate-200 p-8 
    flex justify-around items-center gap-4 bg-slate-900`}
    >
        <div className={`flex justify-start items-center gap-2`}>
            <Image src={ExpensoLogo} alt="Logo" height={50} width={50} />
            <Link
                href={"/"}
                className={`hidden lg1:block text-2xl font-bold cursor-pointer`}
            >
                Expenso
            </Link>
        </div>

      <p>Copyright © 2023 Expenso. All rights reserved</p>

      <div className={`flex justify-start items-center gap-4`}>
        <FaFacebook className={`text-2xl cursor-pointer`} />
        <FaInstagram className={`text-2xl cursor-pointer`} />
        <FaLinkedin className={`text-2xl cursor-pointer`} />
      </div>
      
    </div>
  );
};

export default Footer;
