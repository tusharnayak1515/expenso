"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import { actionCreators } from "@/redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addContact, updateContact } from "@/apiCalls/contact";

const ManageContactModal = ({ contact, setContact, setLoading, toggleModal }: any) => {
  const dispatch: any = useDispatch();

  const initContactData: any = {
    id: contact?._id || null,
    name: contact?.name || "",
    type: contact?.type || "person",
    phone: contact?.phone || "",
  };

  const [contactData, setContactData] = useState(initContactData);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setContactData((prev:any)=> {
      return {
        ...prev,
        [name]: value
      }
    });
  };

  const onAddContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { name, type, phone } = contactData;
      if (
        name.replace("/s/g", "").trim().length !== 0 &&
        ["store", "person"].indexOf(type) !== -1 &&
        phone.length === 10
      ) {
        const res: any = await addContact(contactData);
        if (res.success) {
          dispatch(actionCreators.setMyContacts(res.contacts));
          setLoading(false);
          toast.success("Contact added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setContactData(initContactData);
          toggleModal();
        }
      } else if (name.replace("/s/g", "").trim().length === 0) {
        setLoading(false);
        toast.error("Contact name cannot be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (["store", "person"].indexOf(type) === -1) {
        setLoading(false);
        toast.error("Invalid contact type", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setLoading(false);
        toast.error("Phone number must be 10 digits long", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onUpdateContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { name, type, phone } = contactData;
      if (
        name.replace("/s/g", "").trim().length !== 0 &&
        ["store", "person"].indexOf(type) !== -1 &&
        phone.length === 10
      ) {
        const res: any = await updateContact(contactData);
        if (res.success) {
          dispatch(actionCreators.setMyContacts(res.contacts));
          setLoading(false);
          toast.success("Contact updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setContactData(initContactData);
          setContact(null);
        }
      } else if (name.replace("/s/g", "").trim().length === 0) {
        setLoading(false);
        toast.error("Contact name cannot be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (["store", "person"].indexOf(type) === -1) {
        setLoading(false);
        toast.error("Invalid contact type", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setLoading(false);
        toast.error("Phone number must be 10 digits long", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return ReactDom.createPortal(
    <div className={`fixed inset-0 bg-[#0000005f] z-[600]`}>
      <form
        className={`w-[95%] xxs:w-[400px] xs:w-[450px] md:w-[500px] my-24 mx-auto text-slate-400
        p-6 flex flex-col justify-start items-center 
        gap-4 rounded-md shadow-md shadow-slate-500 bg-slate-950`}
        onSubmit={contact ? onUpdateContact : onAddContact}
      >
        <h1 className={`text-2xl font-bold`}>{contact ? 'Update Contact' : 'Add Contact'}</h1>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={contactData.name}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={contactData?.type}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          >
            <option value="store">store</option>
            <option value="person">person</option>
          </select>
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Phone"
            value={contactData.phone}
            onChange={onChangeHandler}
            className={`w-full py-2 px-4 border border-slate-400 rounded-md 
            outline-none bg-slate-800`}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-900 
          bg-slate-950 transition-all duration-300`}
        >
          Submit
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 font-semibold 
          border border-slate-400 rounded-md hover:bg-slate-950 
          bg-slate-900 transition-all duration-300`}
          onClick={() => contact ? setContact(null) : toggleModal()}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  );
};

export default ManageContactModal;
