import { Input, InputGroup, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface IEmailInputProps extends InputProps {}

export const EmailInput = forwardRef(({ ...rest }: IEmailInputProps, ref) => {
  return (
    <InputGroup>
      <Input type="email" placeholder="Email" ref={ref} {...rest} />
    </InputGroup>
  );
});

EmailInput.displayName = "EmailInput";
