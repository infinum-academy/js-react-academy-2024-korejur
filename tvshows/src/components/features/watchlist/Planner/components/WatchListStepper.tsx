import { useContext } from 'react';
import { WatchListContext } from './WatchListContextProvider';
import { WatchListResults } from './WatchListResults';
import { WatchListWatchStep } from './WatchListWatchStep';

const numberOfSteps = 5;

export const WatchListStepper = () => {
	const { currentStep, shows } = useContext(WatchListContext);

	if (!shows) {
		return null;
	}

	if (currentStep < numberOfSteps) {
		return <WatchListWatchStep />;
	} else {
		return <WatchListResults />;
	}
};