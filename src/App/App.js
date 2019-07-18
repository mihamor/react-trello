import React from "react";
import '../styles/style.css';
import { StateProvider } from '../state/StateProvider';
import { mainReducer, initialState} from '../reducers/reducers';

function App (){

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <div>
        <h1>My React App!</h1>
      </div>
    </StateProvider>
  );
}

export default App;