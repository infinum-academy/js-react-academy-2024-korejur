import { Container } from "@chakra-ui/react";
import { RegisterForm } from "../../components/features/auth/RegisterForm/RegisterForm";

export default function Register() {
  return (
      <Container bgColor="#380a88" padding={5} borderRadius="30px">
        <RegisterForm />
      </Container>
  );
}
