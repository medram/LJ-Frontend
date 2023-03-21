import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { StoreProvider } from './context/StoreContext';
import { QueryClient, QueryClientProvider } from "react-query"

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
