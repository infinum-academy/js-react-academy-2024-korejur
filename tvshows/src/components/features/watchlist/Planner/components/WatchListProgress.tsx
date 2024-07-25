import { Progress } from "@chakra-ui/react";
import { useContext } from "react";
import { WatchListContext } from "./WatchListContextProvider";

const numberOfSteps = 5;

export const WatchListProgress = () => {
  const { currentStep, shows } = useContext(WatchListContext);

  if (!shows) {
    return null;
  }

  const progress = (currentStep / numberOfSteps) * 100;
  return <Progress value={progress} colorScheme="purple" size="sm" />;
};
