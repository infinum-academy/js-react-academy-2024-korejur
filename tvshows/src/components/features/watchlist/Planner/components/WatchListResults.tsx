import { Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { WatchListContext } from "./WatchListContextProvider";

export const WatchListResults = () => {
  const { selectedShows, closeModal } = useContext(WatchListContext);

  return (
    <Flex direction="column" gap={2}>
      <Text textStyle="smallCaptionBold">My Top 5 Wishes:</Text>
      {selectedShows &&
        selectedShows.map((show, index) => {
          return (
            <Flex key={index}>
              <Text textStyle="smallCaptionBold" mr={2}>
                {index + 1}.
              </Text>
              <Text>{show.title}</Text>
            </Flex>
          );
        })}
      <Button
        mt={4}
        onClick={closeModal}
        variant="close"
      >
        Close
      </Button>
    </Flex>
  );
};
