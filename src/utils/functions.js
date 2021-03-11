import axios from 'axios';

//get the access token from the url
export const getParamValues = (url) => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});
};

//set the header for all requests to the spotify API
const setAuthHeader = (accessToken) => {
  try {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.log('Error setting Auth Header', error);
  }
};

//generalized spotify GET request
const spotifyGetRequest = async (url, accessToken) => {
  //set the access token header
  setAuthHeader(accessToken);
  //get result
  const result = await axios.get(url);
  return result.data;
};

//GET the analysis of the songs
const getSongsAnalysis = async (ids, accessToken) => {
  const songsAnalysis = await spotifyGetRequest(
    `https://api.spotify.com/v1/audio-features/?ids=${ids}`,
    accessToken
  );

  return songsAnalysis;
};

//Get user profile
export const getUserProfile = async (accessToken) => {
  const userProfile = await spotifyGetRequest(
    'https://api.spotify.com/v1/me/',
    accessToken
  );
  return userProfile;
};

//get recently played tracks
export const getRecentlyPlayedTracks = async (accessToken) => {
  const recentlyPlayedTracks = await spotifyGetRequest(
    `https://api.spotify.com/v1/me/player/recently-played`,
    accessToken
  );

  return recentlyPlayedTracks.items;
};

//get Song Analysis from the song array
export const getSongsAnalysisArray = async (songArr, accessToken) => {
  //create Array of only Song IDS
  const ids = songArr.map((song) => {
    return song.track.id;
  });
  const stringIds = ids.toString();

  //get analysis from Spotify API
  const data = await getSongsAnalysis(stringIds, accessToken);
  const audioData = data.audio_features;

  //Add song properties (name/album/etc) from initial song array
  for (let i = 0; i < audioData.length; i++) {
    audioData[i].name = songArr[i].track.name;
    audioData[i].album = songArr[i].track.album.name;
    audioData[i].artist = songArr[i].track.artists[0].name;
    audioData[i].imageURL = songArr[i].track.album.images[1].url;
    audioData[i].playedAt = songArr[i].played_at;
    audioData[i].countIndex = i + 1;
  }
  return audioData;
};

//change date string to readable format
export const fixDate = (date) => {
  if (typeof date === 'string') {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const time = date.slice(11, 16);
    const text = `${day}/${month}/${year} at ${time}`;
    return text;
  }
};

//Add ellipse to long song/album names
export const formatStr = (str) => {
  if (typeof str === 'string' && str.length > 18) {
    return str.substr(0, 18) + '...';
  } else {
    return str;
  }
};

export const fixCapitalization = (str) => {
  const splitStr = str.split('-');
  return (
    splitStr[0].charAt(0).toUpperCase() +
    splitStr[0].slice(1) +
    ' ' +
    splitStr[1].charAt(0).toUpperCase() +
    splitStr[1].slice(1)
  );
};
