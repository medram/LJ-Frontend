import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from "react-query";
import { StoreProvider } from './context/StoreContext';

import FullscreenLoading from '@components/FullscreenLoading';
import Fallback from '@components/errors/Fallback';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';


const client = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <Suspense fallback={<FullscreenLoading />}>

        <QueryClientProvider client={client}>
          <StoreProvider>
            <App />
          </StoreProvider>
        </QueryClientProvider>

      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
