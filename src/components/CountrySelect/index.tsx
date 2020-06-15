import React from "react";

import { useCovid } from '../../context/useCovid'

import { Container } from './styles';

const CountrySelect: React.FC = () => {
  const { countryList, selectedCountry, setSelectedCountry } = useCovid();

  return (
    <Container>
      <label>SELECT COUNTRY:</label>
      <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
        <option value="">Global</option>
        {countryList?.map(country => (
          <option value={country.value}>{country.label}</option>
        ))}
      </select>
    </Container>
  );
};

export default CountrySelect;
