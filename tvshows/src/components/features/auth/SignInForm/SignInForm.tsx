"use client";
import useSWRMutation from "swr/mutation";
import { mutator } from "../../../../fetchers/mutators";
import { swrKeys } from "../../../../fetchers/swrKeys";
import { AuthForm } from "@/components/shared/AuthForm/AuthForm";
import { ISignInFormData } from "@/typings/authForms.types";
import { fetcher } from "@/fetchers/fetcher";
import useSWR from "swr";
import { useState } from "react";

export const SignInForm = () => {
  const { mutate } = useSWR(swrKeys.user, fetcher);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { trigger } = useSWRMutation(swrKeys.sign_in, mutator, {
    onSuccess: (data) => {
      mutate(data, { revalidate: false });
      console.log(data);
      setSubmitError("");
      setSubmitted(true);
    },
    onError: (error) => {
      console.error(error);
      setSubmitError("Wrong credentials. Try again.");
    },
  });

  const onSignIn = async (data: ISignInFormData) => {
    setSubmitted(false);
    await trigger(data);
  };

  return (
    <AuthForm<ISignInFormData>
      title="Sign in"
      description="Please sign in using your credentials"
      submitButtonText="Sign in"
      redirectButtonText="Register"
      linkText="Don't have an account?"
      linkHref="/register"
      onSubmit={onSignIn}
      confirmPassword={false}
      successMessage="You are signed in successfully"
      submitError={submitError}
      submitted={submitted}
    />
  );
};
