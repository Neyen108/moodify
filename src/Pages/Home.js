import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  //get the credentials from the .env file
  const {
    REACT_APP_SPOTIFY_CLIENT_ID,
    REACT_APP_SPOTIFY_AUTHORIZE_URL,
    REACT_APP_SPOTIFY_REDIRECT_URL,
  } = process.env;

  //space separated list of scopes
  const scopes = 'user-read-private user-read-recently-played';
  //encoding for uri
  const encodedScopes = encodeURIComponent(scopes);

  //handle login function
  const handleLogin = () => {
    window.location = `${REACT_APP_SPOTIFY_AUTHORIZE_URL}?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&scope=${encodedScopes}&redirect_uri=${REACT_APP_SPOTIFY_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <Navbar />
      <div className='d-flex tan justify-content-center align-items-center text-center content-body'>
        <div>
          <h1 className='title-medium mt-5'>moodify</h1>
          <h2 className='bold'>How are you?</h2>
          <h3 className='px-3'>
            A mood detector based on your recently played music.
          </h3>
          <div className='text-center mt-4'>
            <button className='btn-green' onClick={handleLogin}>
              {' '}
              Connect with Spotify{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
