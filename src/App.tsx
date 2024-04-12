import React from "react";
import {AppRoutes} from "./routes";
import {AppProvider} from "./providers/app";



function App() {
  return (
      <AppProvider>
        <AppRoutes/>
      </AppProvider>

  );
}

export default App;
