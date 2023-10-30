import React, { useState, useEffect } from 'react';
import styles from "./CountryFlag.module.css";
const CountryFlag = () => {
  const [randomCountry, setRandomCountry] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [showPopulation, setShowPopulation] = useState(false);

  useEffect(() => {
    // Fetch a random country when the component mounts
    fetchRandomCountry();
  }, []);

  const fetchRandomCountry = () => {
    fetch('https://restcountries.com/v2/all')
      .then((response) => response.json())
      .then((data) => {
        const randomCountry = data[Math.floor(Math.random() * data.length)];
        setRandomCountry(randomCountry);
      })
      .catch((error) => console.error('Error fetching country data:', error));
  };

  useEffect(() => {
    // Load population data from the local JSON file
    fetch('population.json')
      .then((response) => response.json())
      .then((data) => {
        setPopulationData(data);
      })
      .catch((error) => console.error('Error fetching population data:', error));
  }, []);

  function getPopulation(countryName) {
    if (!populationData) {
      return 'Loading...'; // or some other loading indicator
    }

    const populationDataEntry = populationData.find(
      (entry) => entry.country === countryName
    );
    return populationDataEntry ? populationDataEntry.population : `Oops, look like we don't have the one! Try checking Google.`;
  }

  const handleRegenerate = () => {
    // Fetch a new random country when the button is clicked
    fetchRandomCountry();
    setShowPopulation(false);
  };

  return (
    <div>
      {randomCountry && (
        <div className={styles.CountryInfoWrapper} >
          <h1>Guess <br> the Population of...</br>{randomCountry.name}</h1>
          <img className={styles.CountryFlagImage} src={randomCountry.flags.png} alt={`${randomCountry.name} Flag`} />
          <button className={styles.button} onClick={() => setShowPopulation(!showPopulation)}>
            {showPopulation ? 'Hide Population' : 'Show Population'}
          </button>
          {showPopulation && (
            <p>Population: {getPopulation(randomCountry.name)}</p>
          )}
          <button className={styles.button} onClick={handleRegenerate}>Regenerate</button>
          
        </div>
      )}
    </div>
  );
};

export default CountryFlag;













