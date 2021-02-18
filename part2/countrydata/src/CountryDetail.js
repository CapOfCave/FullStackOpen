const CountryDetail = ({ selectedCountry, weatherData }) => {
  if (selectedCountry == null || weatherData == null) {
    return <></>;
  }
  return (
    <div>
      <h2>{selectedCountry.name}</h2>
      <p>capital {selectedCountry.capital}</p>
      <p>population {selectedCountry.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {selectedCountry.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img
        src={selectedCountry.flag}
        style={{'maxHeight':'300px'}} alt="flag"
      />
      <h3>Weather in {selectedCountry.capital}</h3>
      <p>temperature: {weatherData.main.temp}°F</p>
      <p>{weatherData.weather[0].main}</p>
    </div>
  );
};
export default CountryDetail;
