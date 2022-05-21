import React, { useState } from 'react';
import { JourneyPicker } from '../JourneyPicker';

export const Home = () => {
  const [journey, setJourney] = useState(null);

  const handleJourney = (journeySelection) => {
    console.log(journeySelection);
    setJourney(journeySelection);
  };
  return (
    <>
      <main>
        <JourneyPicker onJourneyChange={handleJourney} />
        {journey !== null
          ? `Nalezeno spojení s id ${journey.results.journeyId}`
          : null}
      </main>
    </>
  );
};
