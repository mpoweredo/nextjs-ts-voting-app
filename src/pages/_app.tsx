import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../chakra/chakra';
import '../styles.css';
import { AuthContextProvider } from 'src/store/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</AuthContextProvider>
	);
}

export default MyApp;
