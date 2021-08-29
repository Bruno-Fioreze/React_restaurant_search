import React from "react";
import { Provider } from "react-redux"; 
import Home from "./pages/Home";
import theme from "./theme";

import store from "./redux/store"
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

function App() {

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <Reset />
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
