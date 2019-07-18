import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Home from '../Home/Home';

function MainRouter (){
  return (
  <main className="content">
    <Switch>
      <Route
      exact path="/"
      render={() => <Home/>}
      />
    </Switch>
  </main>
  );
}

export default MainRouter;
