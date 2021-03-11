import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className='black-body d-flex justify-content-center align-items-center content-body text-center content-body'>
        <div className='container flex-fill mt-5 fixed-container'>
          <h1 className='bold about-header mt-5 black-body whiteish'>about</h1>

          <h5 className='black-body whiteish'>
            This project was built with
            <a className='custom-link' href='https://reactjs.org/'>
              {' '}
              React
            </a>
            ,
            <a className='custom-link' href='https://redux.js.org/'>
              {' '}
              Redux
            </a>
            ,
            <a
              className='custom-link'
              href='https://getbootstrap.com/docs/5.0/getting-started/introduction/'
            >
              {' '}
              Bootstrap 5
            </a>
            ,
            <a
              className='custom-link'
              href='https://developer.spotify.com/documentation/web-api/'
            >
              {' '}
              the Spotify Web API{' '}
            </a>
            ,
            <a
              className='custom-link'
              href='https://developer.spotify.com/documentation/general/guides/authorization-guide/'
            >
              {' '}
              Spotify OAuth2.{' '}
            </a>{' '}
            The full code is available on GitHub
            <a
              className='custom-link'
              href='https://github.com/Neyen108/moodify'
            >
              {' '}
              here
            </a>
            .
          </h5>

          <h1 className='bold about-header mt-5 black-body whiteish'>
            privacy
          </h1>
          <h5 className='mb-5 black-body whiteish'>
            The complete Spotify privacy policy can be viewed{' '}
            <a
              className='custom-link'
              href='https://www.spotify.com/us/legal/privacy-policy/'
            >
              here
            </a>
            , which also covers approved third-party projects like this one.{' '}
          </h5>

          <h1 className='bold about-header mt-5 black-body whiteish'>
            mood detecting
          </h1>
          <h5 className='black-body whiteish mb-5'>
            Your mood is determined based on different analytics (tempo, energy,
            acousticness, etc.) from each song. An average is found from your
            recently played music, which is compared with the levels of an
            'average listener'. That data is matched with one of over thirty
            moods and that's what you see. <br />
            <br /> Moods are strange and ineffable. But hopefully it connected
            with you :)
          </h5>

          <h1 className='bold about-header mt-5 black-body whiteish'>
            contact
          </h1>
          <h5 className='black-body whiteish'>Nayanjeet &#9729;&#65039;</h5>
          <h5 className='black-body whiteish'>
            <a className='custom-link' href='https://github.com/Neyen108'>
              Github
            </a>{' '}
            |{' '}
            <a className='custom-link' href='https://twitter.com/Nayanjeet8'>
              Twitter
            </a>{' '}
            |{' '}
            <a
              className='custom-link'
              href='https://www.linkedin.com/in/nayanjeet-saikia/'
            >
              {' '}
              LinkedIn{' '}
            </a>
          </h5>
          <h5 className='black-body whiteish'>nayanjeetsaikia@gmail.com</h5>
          <h5 className='black-body whiteish mb-5'>Assam 2021 :)</h5>
        </div>
      </div>
    </div>
  );
};

export default About;
