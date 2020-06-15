import React from "react";
import moment from "moment";
import { BarLoader } from "react-spinners";

import { useCovid } from "../../context/useCovid";

import { Container, Card } from "./styles";

const Cards: React.FC = () => {
  const { data } = useCovid();
  const { confirmed, recovered, deaths, lastUpdate } = data;

  return (
    <Container>
      <Card type="confirmed">
        <h3>CONFIRMED:</h3>
        {!!confirmed ? <strong>{confirmed.value}</strong> : <BarLoader />}
        <small>Number of active cases of COVID-19</small>
        <small>{moment(lastUpdate).format("MMMM Do YYYY, h:mm a")}</small>
      </Card>
      <Card type="recovered">
        <h3>RECOVERED:</h3>
        {!!recovered ? <strong>{recovered.value}</strong> : <BarLoader />}
        <small>Number of cured cases of COVID-19</small>
        <small>{moment(lastUpdate).format("MMMM Do YYYY, h:mm a")}</small>
      </Card>
      <Card type="deaths">
        <h3>DEATHS:</h3>
        {!!deaths ? <strong>{deaths.value}</strong> : <BarLoader />}
        <small>Number of detahs caused by COVID-19</small>
        <small>{moment(lastUpdate).format("MMMM Do YYYY, h:mm a")}</small>
      </Card>
    </Container>
  );
};

export default Cards;
