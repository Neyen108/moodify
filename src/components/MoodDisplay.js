import React, { useEffect, useState } from 'react';
import { calculateMood } from '../utils/moodDetector';
import Loading from './Loading';
import smiley from '../assets/smiley.jpg';
import MoodResultHeader from './MoodResultHeader';
import FullBreakdown from './FullBreakdown';
import Footer from './Footer';

const MoodDisplay = ({ songs, profile }) => {
  const [finishedAnalysis, setFinishedAnalysis] = useState(false);
  const [mood, setMood] = useState(() => {
    const yourMood = calculateMood(songs);
    return yourMood;
  });

  //Initiate loading page with 2-sec delay
  useEffect(() => {
    setTimeout(() => {
      setFinishedAnalysis(true);
    }, 2000);
  });

  const profileImg = profile.images.length > 0 ? profile.images[0].url : smiley;

  //if analysis not finished, show loading
  if (finishedAnalysis === false) {
    return (
      <div>
        <Loading text={'Detecting Your Mood'} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <MoodResultHeader mood={mood} imageURL={profileImg} />
      <FullBreakdown mood={mood} />
      <Footer />
    </React.Fragment>
  );
};

export default MoodDisplay;
