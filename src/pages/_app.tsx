import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { TransactionsProvider } from '../hooks/useTransactions';
import { GlobalStyle } from '../../styles/global';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TransactionsProvider>
        <Component {...pageProps} /> <GlobalStyle />
      </TransactionsProvider>
    </AuthProvider>
  );
}
