import axios from "axios";
import { useEffect, useState } from "react";
import CountryDetail from "./CountryDetail";
import CountrySearch from "./CountrySearch";

function App() {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  const countryFilter = (filter) => (country) => {
    return country.name.toLowerCase().includes(filter.toLowerCase());
  };

  useEffect(() => {
    if (selectedCountry != null) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch(e => console.log(e));
    } else {
      setWeatherData(null);
    }
  }, [selectedCountry]);

  return (
    <div>
      <div>
        find countries&nbsp;
        <input
          value={filter}
          onChange={(event) => {
            const countries = allCountries.filter(
              countryFilter(event.target.value)
            );
            if (countries.length === 1) {
              setSelectedCountry(countries[0]);
            } else if (selectedCountry != null) {
              setSelectedCountry(null);
            }
            setFilter(event.target.value);
          }}
        />
      </div>
      <CountrySearch
        countries={allCountries.filter(countryFilter(filter))}
        setSelectedCountry={setSelectedCountry}
        setFilter={setFilter}
      />
      <CountryDetail selectedCountry={selectedCountry} weatherData={weatherData}/>
    </div>
  );
}

export default App;
