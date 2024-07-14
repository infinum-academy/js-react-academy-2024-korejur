'use client';
import useSWRMutation from 'swr/mutation';
import { mutator } from '../../../../fetchers/mutators';
import { swrKeys } from '../../../../fetchers/swrKeys';
import { AuthForm } from '@/components/shared/AuthForm/AuthForm';
import { ISignInFormData } from '@/typings/authForms.types';

export const SignInForm = () => {
  const { trigger } = useSWRMutation(swrKeys.sign_in, mutator, {
    onSuccess: () => {
      console.log('Sign in successful');
    },
  });

  const handleLogin = (data: any) => {
    trigger(data);
  };

  return (
    <AuthForm<ISignInFormData>
      title="Sign in"
      description="Please sign in using your credentials"
      submitButtonText="Sign in"
      redirectButtonText='Register'
      linkText="Don't have an account?"
      linkHref="/register"
      onSubmit={handleLogin}
      confirmPassword={false}
      successMessage='You are signed in successfully'
    />
  );
};
