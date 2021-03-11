import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getRecentlyPlayedTracks,
  getSongsAnalysisArray,
  getUserProfile,
} from '../utils/functions';
import { setTokens } from '../actions';

import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import AnalyzingContainer from '../components/AnalyzingContainer';

const YourMood = ({ history, tokens }) => {
  const [songsData, setSongData] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  //get user's recently played songs
  useEffect(() => {
    const searchRecentlyPlayed = async () => {
      //Check for access token, if none then return to home
      if (!tokens) {
        history.push('/');
      } else {
        try {
          const userRecentlyPlayed = await getRecentlyPlayedTracks(
            tokens.access_token
          );

          const data = await getSongsAnalysisArray(
            userRecentlyPlayed,
            tokens.access_token
          );
          setSongData(data);

          const currUserProfile = await getUserProfile(tokens.access_token);
          setUserProfile(currUserProfile);
        } catch (error) {
          history.push('/notfound');
        }
      }
    };

    searchRecentlyPlayed();
  }, []);

  //Wait for async/await to complete
  if (songsData.length === 0) {
    return (
      <div>
        <Navbar />
        <Loading text={'Connecting to Spotify...'} />
      </div>
    );
  }

  //send songsData and userProfile to analysis page
  return (
    <div>
      <Navbar />
      <AnalyzingContainer songsArray={songsData} userProfile={userProfile} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { tokens: state.tokens };
};

export default connect(mapStateToProps, { setTokens })(YourMood);
