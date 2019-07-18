import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { StateProvider } from './state/StateProvider';
import { mainReducer, initialState} from './reducers/reducers';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <StateProvider initialState={initialState} reducer={mainReducer}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StateProvider>
), document.getElementById('root'));