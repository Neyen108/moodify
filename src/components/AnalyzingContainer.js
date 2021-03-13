import React, { useEffect, useState } from 'react';
import AnalyzingDisplay from './AnalyzingDisplay';
import Loading from './Loading';
import MoodDisplay from './MoodDisplay';

const AnalyzingContainer = ({ songsArray, userProfile }) => {
  const [currentSong, setCurrentSong] = useState('');
  const [finishedAnalysis, setFinishedAnalysis] = useState(false);

  useEffect(() => {
    songsArray.forEach((song, i) => {
      setTimeout(() => {
        setCurrentSong(song);
      }, i * 250);
    });

    setTimeout(() => {
      setFinishedAnalysis(true);
    }, 6000);
  }, []);

  //first wait for async/await to finish
  if (finishedAnalysis === false && songsArray.length === 0) {
    return (
      <div>
        <Loading text={'Connecting to Spotify....'} />
      </div>
    );
  }

  //iterate through the songs being analysed
  if (finishedAnalysis === false && songsArray.length > 0) {
    return <AnalyzingDisplay song={currentSong} />;
  }

  //when analysis is finished return the mood
  return (
    <div>
      <MoodDisplay songs={songsArray} profile={userProfile} />
    </div>
  );
};

export default AnalyzingContainer;
