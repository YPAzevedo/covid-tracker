import React, {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useState,
} from "react";

import api from "../services/api";

interface CovidData {
  confirmed: {
    detail: string;
    value: number;
  };
  recovered: {
    detail: string;
    value: number;
  };
  deaths: {
    detail: string;
    value: number;
  };
  lastUpdate: string;
}

interface CovidDailyDataGlobal {
  confirmed: {
    total: number;
  };
  deaths: {
    total: number;
  };
  reportDate: string;
}

interface CovidDailyData {
  confirmed: {
    value: number;
  };
  recovered: {
    value: number;
  };
  deaths: {
    value: number;
  };
  lastUpdate: string;
}

interface CovidContextData {
  data: CovidData;
  dailyDataGlobal: CovidDailyDataGlobal[];
  dailyData: CovidDailyData;
  countryList: any[];
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
}

const CovidContext = createContext<CovidContextData>({} as CovidContextData);

export const CovidProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CovidData>({} as CovidData);
  const [dailyDataGlobal, setDailyDataGlobal] = useState<CovidDailyDataGlobal[]>([] as CovidDailyDataGlobal[]);
  const [dailyData, setDailyData] = useState<CovidDailyData>({} as CovidDailyData);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("BR");

  useEffect(() => {
    api
      .get(selectedCountry ? `/countries/${selectedCountry}` : "/")
      .then((res) => {
        const { confirmed, recovered, deaths, lastUpdate } = res.data;
        const responseData = {
          confirmed,
          recovered,
          deaths,
          lastUpdate,
        };
        setData(responseData);
      })
      .catch((err) => console.log(err));
  }, [selectedCountry]);

  useEffect(() => {
    api
      .get("/daily")
      .then((res) => {
        setDailyDataGlobal(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!!selectedCountry) {
      api
        .get(`/countries/${selectedCountry}`)
        .then((res) => {
          setDailyData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (countryList.length === 0) {
      api
        .get("/countries")
        .then((res) => {
          const countryOptions = res.data.countries.map(
            (country: { iso2: string; name: string }) => ({
              value: country.iso2,
              label: country.name,
            })
          );
          setCountryList(countryOptions);
        })
        .catch((err) => console.log(err));
    }
  }, [countryList, selectedCountry]);

  const contextValue = useMemo(
    () => ({
      data,
      dailyDataGlobal,
      dailyData,
      countryList,
      selectedCountry,
      setSelectedCountry,
    }),
    [countryList, dailyData, dailyDataGlobal, data, selectedCountry]
  );
  return (
    <CovidContext.Provider value={contextValue}>
      {children}
    </CovidContext.Provider>
  );
};

export function useCovid() {
  const context = useContext(CovidContext);

  if (!context) console.log("useCovid must be used within a CovidProvider");

  return context as CovidContextData;
}
