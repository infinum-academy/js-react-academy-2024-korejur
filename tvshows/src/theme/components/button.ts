import { defineStyleConfig } from "@chakra-ui/react";
import textStyles from "../foundations/typography/textStyles";

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "buttonRadius",
    textTransform: "uppercase",
  },
  sizes: {
    lg: {
      px: { base: 4, md: 12 }, 
      py: { base: 2, md: 5 },  
      // h: "auto",
      ...textStyles.buttonCaptionBold,
    },
  },

  variants: {
    solid: () => ({
      bg: "white",
      color: "purple",

      _hover: {
        bg: "purple",
        color: "white",
      },
    }),
    show: () => {
      return {
        bg: "white",
        color: "purple",
        padding: "10px",
        _hover: {
          bg: "purple",
          color: "white",
        },
      };
    },
    sidebar: {
      _hover: {
        backgroundColor: "purple",
        color: "white",
      },
      _active: {
        backgroundColor: "purple",
        color: "white",
        ...textStyles.h2Bold,
      },
      ...textStyles.h2,
      textTransform: "initial"
    },
    activeSidebar: {
      backgroundColor: "purple",
      color: "white",
      ...textStyles.h2Bold,
      textTransform: "initial"
    },
    mobileSidebar: {
      _hover: {
        backgroundColor: "dark_purple",
        color: "white",
      },
      _active: {
        backgroundColor: "dark_purple",
        color: "white",
        ...textStyles.h2Bold,
      },
      ...textStyles.h2,
      textTransform: "initial",
      textDecoration: "none",

    },
    activeMobileSidebar: {
      backgroundColor: "dark_purple",
      color: "white",
      ...textStyles.h2Bold,
      textTransform: "initial",
      textDecoration: "none",
    },
    logout: () => ({
      bg: "dark_purple",
      color: "white",
      textTransform: "initial",
      ...textStyles.bodyBold,
    }),
  },
  defaultProps: {
    size: "lg",
  },
});

export default Button;
