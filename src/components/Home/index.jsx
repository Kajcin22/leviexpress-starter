import React, { useState } from 'react';
import { JourneyPicker } from '../JourneyPicker';
import JourneyDetail from '../JourneyDetail';
import SelectedSeat from '../SelectedSeat';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [journey, setJourney] = useState(null);

  const navigate = useNavigate();

  const handleJourney = (journeySelection) => {
    console.log(journeySelection);
    setJourney(journeySelection.results);
  };

  const handleBuy = () => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        seat: journey.autoSeat,
        journeyId: journey.journeyId,
      }),
    })
      .then((response) => response.json())
      .then((data) => navigate(`/reservation/${data.results.reservationId}`));
  };

  return (
    <>
      <main>
        <JourneyPicker onJourneyChange={handleJourney} />
        {journey !== null ? <JourneyDetail journey={journey} /> : null}
        {journey !== null ? <SelectedSeat number={journey.autoSeat} /> : null}
        <div className="journey-picker__controls">
          <button onClick={handleBuy} className="btn">
            Rezervovat!
          </button>
        </div>
      </main>
    </>
  );
};
