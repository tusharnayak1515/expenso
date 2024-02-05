"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useSelector, shallowEqual } from "react-redux";
const SidebarModal = dynamic(() => import("./modals/SidebarModal"), {
  ssr: false,
});

import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
  const { profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <SidebarModal showMenu={showMenu} setShowMenu={setShowMenu} />
      <div
        className={`sticky top-0 left-0 right-0 h-[80px] w-full py-2 px-8
    text-slate-400 flex justify-between items-center
    bg-slate-900 z-[500] shadow-md shadow-gray-600`}
      >
        <span onClick={() => setShowMenu(true)} className={`block lg1:hidden`}>
          <HiOutlineMenu
            className={`block lg1:hidden text-3xl cursor-pointer`}
          />
        </span>

        <Link
          href={"/"}
          className={`hidden lg1:block text-2xl font-bold cursor-pointer`}
        >
          Expenso
        </Link>

        <div className={`flex justify-start items-center gap-6`}>
          {profile && (
            <div className={`relative h-12 w-12 rounded-full`}>
              <Image src={profile?.dp} alt="DP" fill className="rounded-full" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
