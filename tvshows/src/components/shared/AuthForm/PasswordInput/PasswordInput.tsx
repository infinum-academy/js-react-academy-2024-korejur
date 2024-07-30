import {
    Button,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";

interface IPasswordInputProps extends InputProps {}

export const PasswordInput = forwardRef(
  ({ ...rest }: IPasswordInputProps, ref) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
      <InputGroup>
        <Input type={show ? "text" : "password"} ref={ref} {...rest} />
        <InputRightElement width="4.5rem">
          <Button size="xs" variant="show" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
