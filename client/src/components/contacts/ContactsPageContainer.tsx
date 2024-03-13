"use client";

import { deleteContact, fetchMyContacts } from "@/apiCalls/contact";
import { actionCreators } from "@/redux";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { FaStore, FaUserAlt } from "react-icons/fa";

const ContactsPageContainer = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const { contacts } = useSelector(
    (state: any) => state.contactReducer,
    shallowEqual
  );

  const [isAddContact, setIsAddContact] = useState(false);
  const [contact, setContact]: any = useState(null);
  const [loading, setLoading] = useState(false);

  const getMyContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res: any = await fetchMyContacts();
      if (res?.success) {
        dispatch(actionCreators.setMyContacts(res?.contacts));
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(
        "Error in fetching contact, in ContactsPageContainer.tsx: ",
        error.response.data.error
      );
    }
  }, [dispatch]);

  const onDeleteContact = async (id: string) => {
    setLoading(true);
    try {
      const res: any = await deleteContact(id);
      if (res?.success) {
        dispatch(actionCreators.setMyContacts(res?.contacts));
        toast.success("Contact deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.error, {
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

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    } else {
      getMyContacts();
    }
  }, [user, router, getMyContacts]);

  return (
    <div
      className={`col-span-12 p-6 text-slate-400 
    flex flex-col justify-start items-center gap-4
    rounded-md bg-slate-900`}
    >
      {loading && <LoadingSpinner />}
      <p className={`text-3xl font-bold`}>Contacts</p>

      <button
        className={`py-2 px-4 text-slate-400 border border-slate-400 rounded-md bg-slate-950`}
        onClick={() => setIsAddContact(true)}
      >
        Add contact
      </button>

      {contacts?.length === 0 ? (
        <p>No contacts to show</p>
      ) : (
        <div className="w-full xl:w-[80%] overflow-x-auto">
          <table className="min-w-full hidden md:table">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Update</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts?.map((contact: any) => {
                return (
                  <tr key={contact?._id}>
                    <td className="border px-4 py-2 text-center">
                      {contact?.name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {contact?.type}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {contact?.phone}
                    </td>
                    <td className="border px-4 py-2">
                      <MdEdit
                        className={`mx-auto text-xl text-orange-600 cursor-pointer`}
                        onClick={() => setContact(contact)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <MdDelete
                        className={`mx-auto text-xl text-red-600 cursor-pointer`}
                        onClick={() => onDeleteContact(contact?._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={`w-full grid md:hidden grid-cols-12 gap-4`}>
            {contacts?.map((contactObj: any) => {
              return (
                <div
                  key={contactObj?._id}
                  className={`relative max-h-[180px] col-span-12 xxxs:col-span-6 py-4 text-slate-200 rounded-md
                  flex flex-col justify-start items-center gap-2 bg-slate-800`}
                >
                  <p>{contactObj?.name}</p>
                  {contactObj?.type === "person" ? (
                    <FaUserAlt className={`text-[75px]`} />
                  ) : (
                    <FaStore className={`text-[75px]`} />
                  )}
                  <p>Phone: {contactObj?.phone}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPageContainer;
