import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(['container']);

const defaultProps = {
  size: 'lg',
}

const Card = helpers.defineMultiStyleConfig({
  defaultProps,
  baseStyle: {
    container: {
      width: "900px",
      maxWidth: "100%",
      color: "purple",
      borderRadius: "cardRadius",
    }
  }
});

export default Card;