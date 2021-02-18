const CountrySearch = ({ countries, setFilter, setSelectedCountry }) => {
  if (countries.length === 0) {
    return <p>No match found</p>;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return countries.map((country) => {
      return (
        <div key={country.name}>
          {country.name}
          <button
            onClick={() => {
              setFilter(country.name)
              setSelectedCountry(country);
            }}
          >
            show
          </button>
        </div>
      );
    });
  } else {
    return <></>;
  }
};

export default CountrySearch;
