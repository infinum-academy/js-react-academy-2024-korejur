import { ShowCard } from "@/components/shared/ShowCard/ShowCard";
import { Box, Button, Flex, Show, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { WatchListContext } from "./WatchListContextProvider";

const numberOfChoicesInOneStep = 4;

export const WatchListWatchStep = () => {
  const { currentStep, shows, selectedShows, setSelectedShows } =
    useContext(WatchListContext);

  if (!shows) {
    return null;
  }

  const currentShows = shows.slice(
    currentStep * numberOfChoicesInOneStep,
    currentStep * numberOfChoicesInOneStep + numberOfChoicesInOneStep
  );

  return (
    <Flex direction="column" gap={3}>
      <Text textStyle="subtitle" mb={4}>
        Select one show to go to the next step:
      </Text>
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        {currentShows.map((show) => {
          const isSelected = selectedShows[currentStep]?.id === show.id;
          const handleClick = () => {
            const newSelectedShows = [...selectedShows];
            newSelectedShows[currentStep] = show;
            setSelectedShows(newSelectedShows);
          };
          return (
            <Box
              key={show.id}
            >
              <Show above="md">
                <Box onClick={handleClick}>
                  {<ShowCard show={show} isClickable={false} isSelected={isSelected} />}
                </Box>
              </Show>
              <Show below="md">
                <Button onClick={handleClick} width="100%">
                  {show.title}
                </Button>
              </Show>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};
