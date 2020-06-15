import React from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Area,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

import { useCovid } from "../../context/useCovid";

import { Container } from "./styles";

const Chart: React.FC = () => {
  const { dailyData, dailyDataGlobal, selectedCountry } = useCovid();

  const areaChartData = dailyDataGlobal?.map((data) => ({
    date: moment(data.reportDate).format("MMMM Do YYYY"),
    confirmed: data.confirmed.total,
    deaths: data.deaths.total,
  }));

  const barChartData = [{
    name: selectedCountry,
    confirmed: dailyData?.confirmed?.value,
    recovered: dailyData?.recovered?.value,
    deaths: dailyData?.deaths?.value,
  }];

  return (
    <Container>
      <ResponsiveContainer width="90%" height={400}>
      {!selectedCountry ? (
        <AreaChart data={areaChartData}>
          <defs>
            <linearGradient id="confirmed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#519FFF" stopOpacity={1} />
              <stop offset="95%" stopColor="#519FFF" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="deaths" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6523" stopOpacity={1} />
              <stop offset="95%" stopColor="#FF6523" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="confirmed"
            stroke="#519FFF"
            fillOpacity={0.7}
            fill="url(#confirmed)"
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stroke="#FF6523"
            fillOpacity={0.7}
            fill="url(#deaths)"
          />
        </AreaChart>
      ) : (
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="confirmed" fill="#519FFF" />
          <Bar dataKey="recovered" fill="#74D321" />
          <Bar dataKey="deaths" fill="#FF6523" />
        </BarChart>
      )}
      </ResponsiveContainer>
    </Container>
  );

  // return (
  //   <Container>
  //     {!selectedCountry ? (
  //       <Line
  //         data={{
  //           labels: dates,
  //           datasets: [
  //             {
  //             data: confirmedData,
  //             label: 'Infected',
  //             backgroundColor: '#519FFF',
  //           },
  //           {
  //             data: deathsData,
  //             label: 'Deaths',
  //             backgroundColor: '#FF6523',
  //           }
  //         ],
  //         }}
  //       />
  //     ) : <Bar
  //           data={{
  //             labels: ["Infected", "Recovered", "Deaths"],
  //             datasets: [{
  //               label: 'People',
  //               backgroundColor: ["#519FFF", "#74D321", "#FF6523"],
  //               data: [confirmedData, recoveredData, deathsData]
  //             }]
  //           }}

  //     />}
  //   </Container>
  // );
};

export default Chart;
