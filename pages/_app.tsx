import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{session: Session;}>) {
  const queryClient = new QueryClient();

  return (
    <div className={inter.className}>
      <SessionProvider session={session}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}

export default appWithTranslation(App);
