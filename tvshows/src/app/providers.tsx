'use client';
import theme from '@/theme/theme';
import { ChakraProvider} from '@chakra-ui/react';
import { SWRConfig } from 'swr';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SWRConfig>
			<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</SWRConfig>
	);
}
