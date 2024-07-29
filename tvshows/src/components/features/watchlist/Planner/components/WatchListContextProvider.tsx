import { IShow, IShowList } from "@/typings/show.types";
import { createContext, ReactNode, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../../../../fetchers/fetcher";
import { swrKeys } from "../../../../../fetchers/swrKeys";
import { Spinner } from "@chakra-ui/react";

interface IWatchListContext {
  currentStep: number;
  setCurrentStep: (newStep: number) => void;
  shows?: Array<IShow>;
  selectedShows: Array<IShow>;
  setSelectedShows: (newShows: Array<IShow>) => void;
  closeModal: () => void;
}
export const WatchListContext = createContext<IWatchListContext>(
  {} as IWatchListContext
);

interface IWatchListContextProviderProps {
  children: ReactNode;
  closeModal: () => void;
}

export const WatchListContextProvider = ({
  children,
  closeModal,
}: IWatchListContextProviderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedShows, setSelectedShows] = useState<Array<IShow>>([]);
  const {
    data: shows,
    error,
    isLoading,
  } = useSWR<IShowList>(swrKeys.shows, fetcher);

  if (error) {
    return <div>Oops, something went wrong...</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <WatchListContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        shows: shows?.shows,
        selectedShows,
        setSelectedShows,
        closeModal,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
