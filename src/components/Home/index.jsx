import React, { useState } from 'react';
import { JourneyPicker } from '../JourneyPicker';
import JourneyDetail from '../JourneyDetail';

export const Home = () => {
  const [journey, setJourney] = useState(null);

  const handleJourney = (journeySelection) => {
    console.log(journeySelection);
    setJourney(journeySelection.results);
  };

  console.log(journey);
  return (
    <>
      <main>
        <JourneyPicker onJourneyChange={handleJourney} />
        {journey !== null ? <JourneyDetail journey={journey} /> : null}
      </main>
    </>
  );
};
