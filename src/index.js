import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { StoreProvider } from './context/StoreContext';
import { QueryClient, QueryClientProvider } from "react-query"
import FullscreenLoading from './components/FullscreenLoading';

const client = new QueryClient()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<FullscreenLoading />}>

      <QueryClientProvider client={client}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </QueryClientProvider>

    </Suspense>
  </React.StrictMode>
);
