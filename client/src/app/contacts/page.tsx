import React from "react";
import dynamic from "next/dynamic";
const ContactsPageContainer = dynamic(
  () => import("@/components/contacts/ContactsPageContainer"),
  { ssr: false }
);

const ContactsPage = () => {
  return <ContactsPageContainer />;
};

export default ContactsPage;
