import React from "react";

import Cards from "./components/Cards";
import CountrySelect from "./components/CountrySelect";
import Chart from "./components/Chart";

import { CovidProvider } from "./context/useCovid";

import logo from './assets/logo.svg';

import { Container, Logo } from "./styles";

import GlobalStyles from "./styles/global";

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Container>
        <Logo src={logo} alt="covid-tracker"/>
        <CovidProvider>
          <Cards />
          <CountrySelect />
          <Chart />
        </CovidProvider>
      </Container>
    </React.Fragment>
  );
};

export default App;
