import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Pages/Home';
import SpotifyRedirect from '../Pages/SpotifyRedirect';
import YourMood from '../Pages/YourMood';
import About from '../Pages/About';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <div className='main'>
          <Switch>
            <Route path='/' exact={true} component={Home}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/redirect' component={SpotifyRedirect} />
            <Route path='/yourmood' component={YourMood} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
