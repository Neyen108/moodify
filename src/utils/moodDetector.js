// Average Mood Levels
const avgDanceability = 0.5;
const avgAcousticness = 0.5;
const avgEnergy = 0.5;
const avgValence = 0.5;

// Max Mood Levels
const maxDanceability = 1;
const maxAcousticness = 1;
const maxEnergy = 1;
const maxValence = 1;

//Mood Detector
export const calculateMood = (songs) => {
  const danceability = getAverage(
    songs.map((song) => {
      return song.danceability;
    })
  );

  const acousticness = getAverage(
    songs.map((song) => {
      return song.acousticness;
    })
  );

  const energy = getAverage(
    songs.map((song) => {
      return song.energy;
    })
  );

  const tempo = getAverage(
    songs.map((song) => {
      return song.tempo;
    })
  );

  const valence = getAverage(
    songs.map((song) => {
      return song.valence;
    })
  );

  // Percent difference Object. Ex: {aboveAvg: true/false, value: x}
  const valenceDifference = getValenceDifference(valence);
  const energyDifference = getEnergyDifference(energy);
  const danceabilityDifference = getDanceabilityDifference(danceability);
  const acousticnessDifference = getAcousticnessDifference(acousticness);

  //sort the differences to find the highest
  const differenceArray = [
    valenceDifference,
    energyDifference,
    danceabilityDifference,
  ].sort((a, b) => {
    return parseFloat(b.difference) - parseFloat(a.difference);
  });

  //get the two moods with highest percent difference
  const firstMood = differenceArray[0];
  const secondMood = differenceArray[1];
  const thirdMood = differenceArray[2];

  const topMoodsOnly = [firstMood.mood, secondMood.mood];

  const result = matchMood(topMoodsOnly);
  const conjunction = getConjunction(topMoodsOnly);

  const resultArray = {
    name: result,
    conjunction,
    firstMood,
    secondMood,
    thirdMood,
    acousticnessDifference,
    tempo: tempo.toFixed(2),
  };

  return resultArray;
};

//get average
const getAverage = (arr) => {
  let reducer = (total, curr) => {
    return total + curr;
  };

  const sum = arr.reduce(reducer);
  return sum / arr.length;
};

const getValenceDifference = (valenceScore) => {
  const result = percentDifference(valenceScore, avgValence, maxValence);
  result.name = 'valence';
  if (result.aboveAvg === true) {
    result.mood = 'more-happiness';
  } else {
    result.mood = 'less-happiness';
  }
  return result;
};

const getEnergyDifference = (energyScore) => {
  const result = percentDifference(energyScore, avgEnergy, maxEnergy);
  result.name = 'energy';
  if (result.aboveAvg === true) {
    result.mood = 'higher-energy';
  } else {
    result.mood = 'lower-energy';
  }
  return result;
};

const getDanceabilityDifference = (danceabilityScore) => {
  const result = percentDifference(
    danceabilityScore,
    avgDanceability,
    maxDanceability
  );
  result.name = 'danceability';
  if (result.aboveAvg === true) {
    result.mood = 'higher-danceability';
  } else {
    result.mood = 'lower-danceability';
  }
  return result;
};

const getAcousticnessDifference = (acousticnessScore) => {
  const result = percentDifference(
    acousticnessScore,
    avgAcousticness,
    maxAcousticness
  );

  result.name = 'acousticness';

  if (result.aboveAvg === true) {
    result.mood = 'higher-acousticness';
  } else {
    result.mood = 'lower-acousticness';
  }

  return result;
};

const percentDifference = (value, avgValue, maxValue) => {
  if (value > avgValue) {
    const difference = ((value - avgValue) / (maxValue - avgValue)) * 100;
    return {
      difference,
      aboveAvg: true,
    };
  }
  if (value < avgValue) {
    const difference = ((avgValue - value) / (maxValue - avgValue)) * 100;
    return {
      difference,
      aboveAvg: false,
    };
  }
};

const matchMood = (moodNames) => {
  // Matching: Higher + Lower (Valence)
  if (
    moodNames.includes('more-happiness') &&
    moodNames.includes('lower-danceability')
  ) {
    return 'peaceful';
  } else if (
    moodNames.includes('more-happiness') &&
    moodNames.includes('lower-energy')
  ) {
    return 'reflective';

    // Matching: Higher + Lower (Danceability)
  } else if (
    moodNames.includes('higher-danceability') &&
    moodNames.includes('less-happiness')
  ) {
    return 'melancholic';
  } else if (
    moodNames.includes('higher-danceability') &&
    moodNames.includes('lower-energy')
  ) {
    return 'a bit tense';

    // Matching: Higher + Lower (Energy)
  } else if (
    moodNames.includes('higher-energy') &&
    moodNames.includes('less-happiness')
  ) {
    return 'a bit gloomy';
  } else if (
    moodNames.includes('higher-energy') &&
    moodNames.includes('lower-danceability')
  ) {
    return 'nervous';

    // Matching: Higher + Higher (All)
  } else if (
    moodNames.includes('more-happiness') &&
    moodNames.includes('higher-danceability')
  ) {
    return 'expressive';
  } else if (
    moodNames.includes('more-happiness') &&
    moodNames.includes('higher-energy')
  ) {
    return 'elated';
  } else if (
    moodNames.includes('higher-danceability') &&
    moodNames.includes('higher-energy')
  ) {
    return 'electric';

    // Matching: Lower + Lower (All)
  } else if (
    moodNames.includes('less-happiness') &&
    moodNames.includes('lower-danceability')
  ) {
    return 'a little blue';
  } else if (
    moodNames.includes('less-happiness') &&
    moodNames.includes('lower-energy')
  ) {
    return 'a bit gloomy';
  } else if (
    moodNames.includes('lower-danceability') &&
    moodNames.includes('lower-energy')
  ) {
    return 'sleepy';
  }
};

// Get the proper conjuction ('and' or 'but') for the display page
const getConjunction = (moodArr) => {
  if (
    (moodArr[0].includes('less') || moodArr[0].includes('lower')) &&
    (moodArr[1].includes('more') || moodArr[1].includes('higher'))
  ) {
    return 'but';
  } else if (
    (moodArr[0].includes('more') || moodArr[0].includes('higher')) &&
    (moodArr[1].includes('less') || moodArr[1].includes('lower'))
  ) {
    return 'but';
  } else {
    return 'and';
  }
};
