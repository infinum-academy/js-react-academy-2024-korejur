"use client";
import useSWRMutation from "swr/mutation";
import { mutator } from "../../../../fetchers/mutators";
import { swrKeys } from "../../../../fetchers/swrKeys";
import { AuthForm } from "@/components/shared/AuthForm/AuthForm";
import { ILoginFormData } from "@/typings/authForms.types";
import { fetcher } from "@/fetchers/fetcher";
import useSWR from "swr";
import { useState } from "react";

export const LoginForm = () => {
  const { mutate } = useSWR(swrKeys.user, fetcher);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { trigger } = useSWRMutation(swrKeys.login, mutator, {
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

  const onLogin = async (data: ILoginFormData) => {
    setSubmitted(false);
    await trigger(data);
  };

  return (
    <AuthForm<ILoginFormData>
      title="Login"
      description="Please log in using your credentials"
      submitButtonText="Log in"
      redirectButtonText="Register"
      linkText="Don't have an account?"
      linkHref="/register"
      onSubmit={onLogin}
      confirmPassword={false}
      successMessage="You are logged in successfully"
      submitError={submitError}
      submitted={submitted}
    />
  );
};
