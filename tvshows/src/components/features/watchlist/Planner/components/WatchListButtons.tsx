import { Flex, Button, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { WatchListContext } from "./WatchListContextProvider";

const numberOfSteps = 5;

export const WatchListButtons = () => {
  const { currentStep, setCurrentStep, selectedShows } =
    useContext(WatchListContext);
  return (
    <Flex width="100%" justifyContent="space-between">
      {currentStep > 0 && currentStep !== numberOfSteps && (
        <Button onClick={() => setCurrentStep(currentStep - 1)}>
          Previous
        </Button>
      )}
      <Spacer />
      {currentStep < numberOfSteps && selectedShows[currentStep] !== undefined && (
        <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
      )}
    </Flex>
  );
};
