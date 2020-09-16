import React from "react";
import Router from "./components/Router";
import styled from "styled-components";

const GlobalStyle = styled.div`
  font-family: "Montserrat", sans-serif;
`;

function App() {
  return (
    <GlobalStyle>
      <Router />
    </GlobalStyle>
  );
}

export default App;
