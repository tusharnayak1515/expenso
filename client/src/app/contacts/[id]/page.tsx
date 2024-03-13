import React from "react";
import dynamic from "next/dynamic";
const ContactDetailPageContainer = dynamic(
  () => import("@/components/contacts/ContactDetailPageContainer"),
  { ssr: false }
);

const ContactDetailPage = () => {
  return <ContactDetailPageContainer />;
};

export default ContactDetailPage;
