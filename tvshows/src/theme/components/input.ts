import { defineStyleConfig } from "@chakra-ui/react";
import textStyles from "../foundations/typography/textStyles";

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
    ...textStyles.smallCaption
  },
  defaultProps: {
    variant: "outline",
  },
});

export default Input;
