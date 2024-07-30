import { Container } from "@chakra-ui/react";
import { LoginForm } from "../../components/features/auth/LoginForm/LoginForm";
import { AuthRedirect } from "../../components/shared/AuthRedirect/AuthRedirect";

export default function Login() {
  return (
    <>
      <AuthRedirect to="/shows" condition="loggedIn" />
      <Container padding={5} borderRadius='30px'>
        <LoginForm />
      </Container>
    </>
  );
}
