import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';

const Reservation = () => {
  const [reservation, setReservation] = useState(null);

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch(`https://apps.kodim.cz/daweb/leviexpress/api/reservation?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setReservation(data.results);
      });
  }, []);

  return (
    <>
      <div className="reservation container">
        <h2>
          Vaše e-jízdenka č.{' '}
          {reservation !== null ? reservation.reservationId : null}{' '}
        </h2>
        <div className="reservation__body">
          <div className="reservation__headings">
            <p>Datum cesty: </p>
            <p>Odjezd: </p>
            <p>Příjezd: </p>
            <p>Sedadlo:</p>
          </div>
          <div className="reservation__info">
            <p>{reservation !== null ? reservation.date : null}</p>
            <p>
              {' '}
              {reservation !== null
                ? reservation.fromCity.name + ', ' + reservation.fromCity.time
                : null}
            </p>
            <p>
              {' '}
              {reservation !== null
                ? reservation.toCity.name + ', ' + reservation.toCity.time
                : null}
            </p>
            <p> {reservation !== null ? reservation.seatNumber : null}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;
