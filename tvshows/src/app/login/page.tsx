import { Container } from "@chakra-ui/react";
import { SignInForm } from "../../components/features/auth/SignInForm/SignInForm";
import { AuthRedirect } from "../../components/shared/AuthRedirect/AuthRedirect";

export default function Login() {
  return (
    <>
      <AuthRedirect to="/shows" condition="loggedIn" />
      <Container padding={5} borderRadius='30px'>
        <SignInForm />
      </Container>
    </>
  );
}
