"use client"

import React from "react";
import dynamic from "next/dynamic";
import ReactDom from "react-dom";
const Sidebar = dynamic(()=> import("../Sidebar"), {ssr: false});
import { MdOutlineClose } from "react-icons/md";

const SidebarModal = ({showMenu, setShowMenu}:any) => {
  return ReactDom.createPortal(
    <div className={`block lg1:hidden fixed ${!showMenu ? 'top-0 left-[-1000px]' : 'inset-0'} bg-[#0000005f] z-[600] 
    transition-all duration-500`}>
      <div className={`relatiive h-[100vh] w-[250px]`}>
        <Sidebar modal={true} setShowMenu={setShowMenu} /> 
      </div>
      <MdOutlineClose className={`absolute left-[260px] top-[20px] text-3xl text-slate-200`} onClick={()=> setShowMenu(false)} />
    </div>,
    document.getElementById("modal")!
  );
};

export default SidebarModal;
