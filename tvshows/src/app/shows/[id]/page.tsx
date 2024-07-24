"use client";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { ShowContainer } from "@/components/features/shows/ShowContainer/ShowContainer";

const ShowDetails = () => {
  return (
    <>
      <AuthRedirect to="/login" condition="loggedOut" />
      <ShowContainer />
    </>
  );
};

export default ShowDetails;
