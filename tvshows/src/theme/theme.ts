import { extendTheme } from "@chakra-ui/react";
import Alert from "./components/alert";
import Button from "./components/button";
import Card from "./components/card";
import Input from "./components/input";
import Link from "./components/link";
import colors from "./foundations/colors";
import radii from "./foundations/radius";
import fonts from "./foundations/typography/fonts";
import textStyles from "./foundations/typography/textStyles";
import Textarea from "./components/textarea";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "dark_purple",
        color: "white",
      },
      ".authFormContainer": {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      ".authFormBox": {
        width: { base: "90%", md: "400px" },
        p: 5,
        backgroundColor: "purple",
        borderRadius: "buttonRadius",
        textAlign: "center",
      },
    }),
  },
  components: {
    Button,
    Card,
    Alert,
    Input,
    Link,
    Textarea
  },
  colors,
  radii,
  fonts,
  textStyles,
});

export default theme;
