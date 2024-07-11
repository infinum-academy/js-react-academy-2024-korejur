'use client'
import { useRedirect } from '../hooks/useRedirect';
import { Spinner } from '@chakra-ui/react';

export default function Home() {
	
	const isRunning = useRedirect('/shows', true);

	if (isRunning) {
		return <Spinner />;
	}

	return null;
}
