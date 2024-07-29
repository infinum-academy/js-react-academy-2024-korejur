import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(['container']);

const Alert = helpers.defineMultiStyleConfig({
    baseStyle: {
        container: {
          borderRadius: "buttonRadius",
        },
      },
  });
  
export default Alert