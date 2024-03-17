import React from "react";
import dynamic from "next/dynamic";
const ContactDetailPageContainer = dynamic(
  () => import("@/components/contacts/ContactDetailPageContainer"),
  { ssr: false }
);

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Details",
};

const ContactDetailPage = () => {
  return <ContactDetailPageContainer />;
};

export default ContactDetailPage;
