// components/textarea.js
import { defineStyleConfig } from "@chakra-ui/react";

const Textarea = defineStyleConfig({
  baseStyle: {
    borderRadius: "cardRadius",
    _placeholder: {
        color: "light_purple",
    },
    _invalid: {
      borderColor: "error",
    },
    color: "dark_purple",
        bg: "white",
  },
  defaultProps: {
    variant: "solid",
  },
});

export default Textarea;
