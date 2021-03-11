import React from 'react';
import {
  getRecentlyPlayedTracks,
  getSongsAnalysisArray,
  getUserProfile,
} from '../utils/functions';
import { connect } from 'react-redux';
import { setTokens } from '../actions';

import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

const YourMood = () => {
  return <h1>Logged In</h1>;
};

const mapStateToProps = (state) => {
  return { tokens: state.tokens };
};

export default connect(mapStateToProps, { setTokens })(YourMood);
