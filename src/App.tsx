import React from "react";

import {AppProvider} from "./providers/app";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
      <QueryClientProvider client={queryClient}>
      <AppProvider/>
      </QueryClientProvider>
  );
}

export default App;
