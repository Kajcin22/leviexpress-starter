import React, { useEffect, useState } from 'react';
import mapImage from './img/map.svg';
import './style.css';

const CityOptions = ({ cities }) => {
  console.log(cities);

  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </>
  );
};

const DateOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateBasic}
        </option>
      ))}
    </>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setCities(data.results);
      });
  }, []);

  useEffect(() => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/dates')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setDates(data.results);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`,
    )
      .then((response) => response.json())
      .then((data) => onJourneyChange(data));
  };

  return (
    <>
      <div className="journey-picker container">
        <h2 className="journey-picker__head">Kam chcete jet?</h2>
        <div className="journey-picker__body">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="journey-picker__form"
          >
            <label>
              <div className="journey-picker__label">Odkud:</div>
              <select
                onChange={(e) => setFromCity(e.target.value)}
                value={fromCity}
              >
                <CityOptions cities={cities} />
              </select>
            </label>
            <label>
              <div className="journey-picker__label">Kam:</div>
              <select
                onChange={(e) => setToCity(e.target.value)}
                value={toCity}
              >
                <CityOptions cities={cities} />
              </select>
            </label>
            <label>
              <div className="journey-picker__label">Datum:</div>
              <select onChange={(e) => setDate(e.target.value)} value={date}>
                <DateOptions dates={dates} />
              </select>
            </label>
            <div className="journey-picker__controls">
              <button
                disabled={
                  fromCity !== '' && toCity !== '' && date !== '' ? false : true
                }
                className="btn"
                type="submit"
              >
                Vyhledat spoj
              </button>
            </div>
          </form>
          <img className="journey-picker__map" src={mapImage} />
        </div>
      </div>
    </>
  );
};
