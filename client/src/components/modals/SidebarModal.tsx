import React from "react";
import ReactDom from "react-dom";
import Sidebar from "../Sidebar";
import { MdOutlineClose } from "react-icons/md";

const SidebarModal = ({setShowMenu}:any) => {
  return ReactDom.createPortal(
    <div className={`fixed inset-0 bg-[#0000005f] z-[600]`}>
        <div className={`relatiive h-[100vh] w-[250px]`}>
           <Sidebar modal={true} setShowMenu={setShowMenu} /> 
        </div>
        <MdOutlineClose className={`absolute left-[260px] top-[20px] text-3xl text-slate-200`} onClick={()=> setShowMenu(false)} />
    </div>,
    document.getElementById("modal")!
  );
};

export default SidebarModal;
