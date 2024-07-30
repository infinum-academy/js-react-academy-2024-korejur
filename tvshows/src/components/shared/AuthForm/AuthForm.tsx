"use client";
import { ILoginFormData, IRegisterFormData } from "@/typings/authForms.types";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Link,
  Text,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { EmailInput } from "./EmailInput/EmailInput";
import { PasswordInput } from "./PasswordInput/PasswordInput";

interface IAuthFormProps {
  title: string;
  description: string;
  submitButtonText: string;
  redirectButtonText: string;
  linkText: string;
  linkHref: string;
  onSubmit: (data: IRegisterFormData | ILoginFormData) => void;
  successMessage?: string;
  submitError?: string;
  confirmPassword: boolean; // also used to check if user is currently on registration form
  submitted: boolean;
}

export const AuthForm = ({
  title,
  description,
  submitButtonText,
  redirectButtonText,
  linkText,
  linkHref,
  onSubmit,
  successMessage,
  submitError,
  confirmPassword,
  submitted,
}: IAuthFormProps) => {
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<IRegisterFormData | ILoginFormData>();

  const handleFormSubmit = async (data: IRegisterFormData | ILoginFormData) => {
    try {
      if (confirmPassword) {
        const formData = data as IRegisterFormData;
        const isPasswordValid = validatePassword(formData.password);
        if (!isPasswordValid) {
          setPasswordError(
            "Password must have at least 8 characters, one uppercase letter, one number, and one symbol."
          );
          return;
        } else {
          setPasswordError("");
        }

        if (formData.password !== formData.password_confirmation) {
          setConfirmPasswordError("Passwords do not match");
          return;
        } else {
          setConfirmPasswordError("");
        }
      }

      onSubmit(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const validatePassword = (value: string) => {
    return validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  };

  const handlePasswordBlur = (value: string) => {
    if (!validatePassword(value)) {
      setPasswordError(
        "Password must have at least 8 characters, 1 uppercase letter, 1 number, and 1 symbol."
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      {confirmPassword && submitted && successMessage && (
        <>
          <Alert status="success" color="green">
            {successMessage}
          </Alert>
          <Box textAlign="center" pt={5}>
            <Link href={linkHref} textStyle="buttonCaptionBold">
              {redirectButtonText}
            </Link>
          </Box>
        </>
      )}
      {!submitted && (
        <Flex
          direction="column"
          gap={3}
          alignItems="center"
          backgroundColor="purple_2"
          padding={5}
          borderRadius="buttonRadius"
        >
          <Flex
            direction="row"
            alignItems="center"
            width="100%"
            position="relative"
          >
            <Link href="/">
              <IconButton
                icon={<ArrowBackIcon />}
                variant="back"
                size="md"
                aria-label="back to home page"
                position="absolute"
                top={0}
                left={0}
              />
            </Link>
            <Box flex="1" textAlign="center">
              <Heading as="h2">{title}</Heading>
            </Box>
          </Flex>

          <Text textAlign="center">{description}</Text>
          <chakra.form
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={5}
            onSubmit={handleSubmit(handleFormSubmit)}
            mt={2}
          >
            <FormControl isRequired>
              <EmailInput
                {...register("email", {
                  required: "Email is required",
                })}
                isDisabled={isSubmitting}
              ></EmailInput>
            </FormControl>
            <FormControl isRequired>
              <PasswordInput
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter password"
                isDisabled={isSubmitting}
                onBlur={() => handlePasswordBlur(watch("password"))}
              ></PasswordInput>
              {confirmPassword && passwordError && (
                <Text color="error" m={2} textStyle="note">
                  {passwordError}
                </Text>
              )}
            </FormControl>
            {confirmPassword && (
              <FormControl isRequired>
                <PasswordInput
                  {...register("password_confirmation", {
                    required: "Please confirm your password",
                  })}
                  placeholder="Repeat password"
                  isDisabled={isSubmitting}
                ></PasswordInput>
                {confirmPassword && confirmPasswordError && (
                  <Text color="error" m={2} textStyle="note">
                    {confirmPasswordError}
                  </Text>
                )}
              </FormControl>
            )}
            {submitError && (
              <Box textAlign="center">
                <Alert status="error" color="error" bg="transparent">
                  {submitError}
                </Alert>
              </Box>
            )}
            <Button
              type="submit"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              {submitButtonText}
            </Button>
            <Flex flexDirection="row" gap={2}>
              <Text textStyle="buttonCaption" textAlign="center">
                {linkText}
              </Text>
              <Link href={linkHref}>{redirectButtonText}</Link>
            </Flex>
          </chakra.form>
        </Flex>
      )}
    </>
  );
};
