import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Home from '../Home/Home';
import DeskPage from '../DeskPage/DeskPage';

function MainRouter (){
  return (
  <main className="content">
    <Switch>
      <Route exact path="/" component={Home}/>
       <Route path='/desk/:id' component={DeskPage}/>
    </Switch>
  </main>
  );
}

export default MainRouter;
