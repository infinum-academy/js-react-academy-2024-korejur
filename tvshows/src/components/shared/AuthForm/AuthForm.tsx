"use client";
import { IRegisterFormData, ISignInFormData } from "@/typings/authForms.types";
import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  chakra
} from "@chakra-ui/react";
import { useState } from "react";
import { Path, useForm } from "react-hook-form";
import validator from "validator";

interface IAuthFormProps<T> {
  title: string;
  description: string;
  submitButtonText: string;
  redirectButtonText: string;
  linkText: string;
  linkHref: string;
  onSubmit: (data: T) => void;
  successMessage?: string;
  submitError?: string;
  confirmPassword: boolean; // also used to check if user is currently on registration form
  submitted: boolean;
}

export const AuthForm = <T extends IRegisterFormData | ISignInFormData>({
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
}: IAuthFormProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // probala sam s ovim, ali stalno se nešto crveni i ne znam popraviti
    watch,
  } = useForm<T>();

  const handleFormSubmit = async (data: T) => {
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
        "Password must have at least 8 characters, one uppercase letter, one number, and one symbol."
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      {submitted && successMessage && (
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
        <Flex direction="column" gap={3} alignItems="center" backgroundColor="purple" padding={5} borderRadius="buttonRadius">
          <Heading as="h2">{title}</Heading>
          <Text>{description}</Text>
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
              <InputGroup>
                <Input
                  {...register("email" as Path<T>, {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder="Email"
                  isDisabled={isSubmitting}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  {...register("password" as Path<T>, {
                    required: "Password is required",
                  })}
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  onBlur={() =>
                    handlePasswordBlur(watch("password" as Path<T>))
                  }
                  isDisabled={isSubmitting}
                />
                <InputRightElement width="4.5rem" p={1}>
                  <Button
                    size="xs"
                    onClick={handlePasswordClick}
                    isDisabled={isSubmitting}
                    variant="show"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {confirmPassword && passwordError && (
                <Text color="error" m={2} textStyle="note">
                  {passwordError}
                </Text>
              )}
            </FormControl>
            {confirmPassword && (
              <FormControl isRequired>
                <InputGroup>
                  <Input
                    {...register("password_confirmation" as Path<T>, {
                      required: "Please confirm your password",
                    })}
                    pr="4.5rem"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    isDisabled={isSubmitting}
                  />
                  <InputRightElement width="4.5rem" p={1}>
                    <Button
                      size="xs"
                      onClick={handleConfirmPasswordClick}
                      isDisabled={isSubmitting}
                      variant="show"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {confirmPassword && confirmPasswordError && (
                  <Text color="error" m={2} textStyle="note">
                    {confirmPasswordError}
                  </Text>
                )}
              </FormControl>
            )}
            {submitError && (
              <Box textAlign="center">
                <Alert status="error" color="error" bg='transparent'>
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
              <Text textStyle="buttonCaption">{linkText}</Text>
              <Link href={linkHref}>
                {redirectButtonText}
              </Link>
            </Flex>
          </chakra.form>
        </Flex>
      )}
    </>
  );
};
