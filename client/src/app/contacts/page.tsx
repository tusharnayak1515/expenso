import React from "react";
import dynamic from "next/dynamic";
const ContactsPageContainer = dynamic(
  () => import("@/components/contacts/ContactsPageContainer"),
  { ssr: false }
);

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts",
};

const ContactsPage = () => {
  return <ContactsPageContainer />;
};

export default ContactsPage;
