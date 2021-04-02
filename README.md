# Moodify (https://moodify-site.netlify.app/)    

A web-based mood detector, that detects the mood based on your recently played songs from Spotify.   
Uses Spotify’s APIs for fetching and analysing the tracks and extracting a song’s data.       

     

## 🛠 Installing

1. Install dependencies

   ```bash
   npm install
   ```

2. Fire up the server and watch files

   ```bash
   npm start
   ```

## 🚀 Compiles and minifies for production

```bash
npm run build
```

## 🛠 Built with

- [React](https://reactjs.org/)   
- [BootStrap5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)     
- [Spotify API](https://developer.spotify.com/documentation/web-api/)     

## 🛠 Local Development Environment

   To run this project in your own Development Environment.
   ```bash
   Create a .env file in the working directory.
   Inside the .env file add the following:
        REACT_APP_SPOTIFY_CLIENT_ID=<your_client_id_from_spotify> 
        REACT_APP_SPOTIFY_AUTHORIZE_URL=https://accounts.spotify.com/authorize
        REACT_APP_SPOTIFY_REDIRECT_URL=<your_redirect_url>
   The client id can be obtained from the Spotify for Developers site while registering the app.
   The redirect_url is the url that Spotify Auth should redirect to after authorization. 
   ```
   
   Once set up, run:
   ```bash
   npm install
   npm start
   ```
   And the project should load up.
  
