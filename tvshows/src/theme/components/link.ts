import { defineStyleConfig } from "@chakra-ui/react";
import textStyles from "../foundations/typography/textStyles";

const Link = defineStyleConfig({
    baseStyle: {
        ...textStyles.buttonCaptionBold
      },
  });
  
export default Link