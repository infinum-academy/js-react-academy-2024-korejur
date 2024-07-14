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
  confirmPassword?: boolean;
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
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // also can be used to check if user is currently on registration form
  const handleClick = () => setShow(!show);
  const { register, handleSubmit, watch } = useForm<T>();

  const handleFormSubmit = (data: T) => {
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
    setSubmitted(true);
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
          <Box textAlign='center' pt={5}><Link href={linkHref} fontWeight="bold">
            {redirectButtonText}
          </Link></Box>
          
        </>
      )}
      {!submitted && (
        <Flex direction="column" gap={3} alignItems="center">
          <Heading as="h2">{title}</Heading>
          <Text>{description}</Text>
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
                  {...register("email" as Path<T>, { required: true })}
                  type="email"
                  borderRadius="30px"
                  focusBorderColor="aliceblue"
                  placeholder="Email"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="lg">Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  {...register("password" as Path<T>, { required: true })}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  focusBorderColor="aliceblue"
                  borderRadius="30px"
                  onBlur={() =>
                    handlePasswordBlur(watch("password" as Path<T>))
                  }
                  required
                />
                <InputRightElement width="4.5rem" p={1}>
                  <Button size="md" onClick={handleClick} borderRadius="30px">
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {confirmPasswordError && (passwordError && (
                <Text color="red" m={2}>
                  {passwordError}
                </Text>
              ))}
            </FormControl>
            {confirmPassword && (
              <FormControl isRequired>
                <FormLabel fontSize="lg">Repeat Password</FormLabel>
                <InputGroup size="lg">
                  <Input
                    {...register("password_confirmation" as Path<T>, {
                      required: true,
                    })}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Repeat password"
                    focusBorderColor="aliceblue"
                    borderRadius="30px"
                  />
                  <InputRightElement width="4.5rem" p={1}>
                    <Button size="md" onClick={handleClick} borderRadius="30px">
                      {show ? "Hide" : "Show"}
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
            <Button type="submit" borderRadius="10px">
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
