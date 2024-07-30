import { defineStyleConfig } from "@chakra-ui/react";
import textStyles from "../foundations/typography/textStyles";

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "buttonRadius",
    textTransform: "uppercase",
  },
  sizes: {
    lg: {
      px: { base: 4, md: 6 },
      py: { base: 2, md: 4 },
      ...textStyles.buttonCaptionBold,
    },
  },

  variants: {
    solid: () => ({
      bg: "white",
      color: "purple_2",

      _hover: {
        bg: "dark_purple",
        color: "white",
      },
    }),
    show: () => {
      return {
        bg: "white",
        color: "purple_2",
        padding: "10px",
        _hover: {
          bg: "dark_purple",
          color: "white",
        },
      };
    },
    sidebar: {
      _hover: {
        backgroundColor: "purple_2",
        color: "white",
      },
      _active: {
        backgroundColor: "purple_2",
        color: "white",
      },
      ...textStyles.h2,
      textTransform: "initial",
    },
    activeSidebar: {
      backgroundColor: "purple_2",
      color: "white",
      ...textStyles.h2Bold,
      textTransform: "initial",
    },
    mobileSidebar: {
      _hover: {
        backgroundColor: "dark_purple",
        color: "white",
      },
      _active: {
        backgroundColor: "dark_purple",
        color: "white",
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
      _hover: {
        bg: "purple_2",
        color: "white",
      },
    }),
    close: () => ({
      bg: "dark_purple",
      color: "white",
      textTransform: "initial",
      _hover: {
        bg: "purple_2",
        color: "white",
      },
    }),
    back: () => ({
      bg: "purple_2",
      color: "white",
      px: "0",
      _hover: {
        bg: "dark_purple",
        color: "white",
      },
    }),
  },
  defaultProps: {
    size: "lg",
  },
});

export default Button;
