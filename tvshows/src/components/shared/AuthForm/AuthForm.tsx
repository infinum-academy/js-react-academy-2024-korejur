"use client";
import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, Path } from "react-hook-form";
import validator from "validator";
import { IRegisterFormData, ISignInFormData } from "@/typings/authForms.types";

interface IAuthFormProps<T> {
  title: string;
  description: string;
  submitButtonText: string;
  redirectButtonText: string;
  linkText: string;
  linkHref: string;
  onSubmit: (data: T) => void;
  successMessage?: string;
  confirmPassword?: boolean;  // also used to check if user is currently on registration form
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
  confirmPassword,
}: IAuthFormProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); 
  const [submitError, setSubmitError] = useState("");
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);
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

      await onSubmit(data);
      setSubmitted(true);
    } catch (error: any) {
      setSubmitError(error.message || "An error occurred during submission");
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
          <Alert status="success" color="green" borderRadius="10px">
            {successMessage}
          </Alert>
          <Box textAlign="center" pt={5}>
            <Link href={linkHref} fontWeight="bold">
              {redirectButtonText}
            </Link>
          </Box>
        </>
      )}
      {!submitted && (
        <Flex direction="column" gap={3} alignItems="center">
          <Heading as="h2">{title}</Heading>
          <Text>{description}</Text>
          {submitError && (
            <Alert status="error" color="red" borderRadius="10px">
              {submitError}
            </Alert>
          )}
          <chakra.form
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={5}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <FormControl isRequired>
              <FormLabel fontSize="lg">Email</FormLabel>
              <InputGroup size="lg">
                <Input
                  {...register("email" as Path<T>, { required: "Email is required" })}
                  type="email"
                  borderRadius="30px"
                  focusBorderColor="aliceblue"
                  placeholder="Email"
                  isDisabled={isSubmitting}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="lg">Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  {...register("password" as Path<T>, { required: "Password is required" })}
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  focusBorderColor="aliceblue"
                  borderRadius="30px"
                  onBlur={() => handlePasswordBlur(watch("password" as Path<T>))}
                  isDisabled={isSubmitting}
                />
                <InputRightElement width="4.5rem" p={1}>
                  <Button size="md" onClick={handlePasswordClick} borderRadius="30px" isDisabled={isSubmitting}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordError && (
                <Text color="red" m={2}>
                  {passwordError}
                </Text>
              )}
            </FormControl>
            {confirmPassword && (
              <FormControl isRequired >
                <FormLabel fontSize="lg">Repeat Password</FormLabel>
                <InputGroup size="lg">
                  <Input
                    {...register("password_confirmation" as Path<T>, { required: "Please confirm your password" })}
                    pr="4.5rem"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    focusBorderColor="aliceblue"
                    borderRadius="30px"
                    isDisabled={isSubmitting}
                  />
                  <InputRightElement width="4.5rem" p={1}>
                    <Button size="md" onClick={handleConfirmPasswordClick} borderRadius="30px" isDisabled={isSubmitting}>
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {confirmPasswordError && (
                  <Text color="red" m={2}>
                    {confirmPasswordError}
                  </Text>
                )}
              </FormControl>
            )}
            <Button type="submit" borderRadius="10px" isLoading={isSubmitting} isDisabled={isSubmitting}>
              {submitButtonText}
            </Button>
            <Flex flexDirection="row" gap={2}>
              <Text>{linkText}</Text>
              <Link href={linkHref} fontWeight="bold">
                {redirectButtonText}
              </Link>
            </Flex>
          </chakra.form>
        </Flex>
      )}
    </>
  );
};
