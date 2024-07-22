import { defineStyleConfig } from "@chakra-ui/react";

const Input = defineStyleConfig({
  baseStyle: {
    field: {
      borderRadius: "buttonRadius",
      _placeholder: {
        color: "white",
      },
      _focus: {
        borderColor: "white",
      },
      _invalid: {
        borderColor: "error",
      },
    },
  },
  defaultProps: {
    variant: "outline",
  },
});

export default Input;
