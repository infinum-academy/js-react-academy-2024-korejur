'use client';
import { AuthForm } from '@/components/shared/AuthForm/AuthForm';
import { mutator } from '../../../../fetchers/mutators';
import { swrKeys } from '../../../../fetchers/swrKeys';
import useSWRMutation from 'swr/mutation';
import { IRegisterFormData } from '@/typings/authForms.types';

export const RegisterForm = () => {
  const { trigger } = useSWRMutation(swrKeys.register, mutator, {
    onSuccess: () => {
      console.log('Registration successful');
    },
  });

  const handleRegister = (data: IRegisterFormData) => {
    trigger(data);
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
    />
  );
};
