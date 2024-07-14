'use client';
import { AuthForm } from '@/components/shared/AuthForm/AuthForm';
import { mutator } from '../../../../fetchers/mutators';
import { swrKeys } from '../../../../fetchers/swrKeys';
import useSWRMutation from 'swr/mutation';
import { IRegisterFormData } from '@/typings/authForms.types';
import { useState } from 'react';

export const RegisterForm = () => {
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { trigger } = useSWRMutation(swrKeys.register, mutator, {
    onSuccess: () => {
      console.log('Registration successful');
      setSubmitError("");
      setSubmitted(true); 
    },
    onError: (error) => {
      console.error(error);
      setSubmitError("Error occurred. Try again.");
      setSubmitted(false);
    },
  });

  const handleRegister = async (data: IRegisterFormData) => {
    try {
      await trigger(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthForm<IRegisterFormData>
      title="Register"
      description="Please enter your email to register"
      submitButtonText="Sign up"
      redirectButtonText='Sign in'
      linkText="Already have an account?"
      linkHref="/login"
      onSubmit={handleRegister}
      confirmPassword={true}
      successMessage="You are registered successfully!"
      submitError={submitError}
      submitted={submitted}
    />
  );
};
