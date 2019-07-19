import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { useStateValue } from '../hooks';
import { getDeskById, setDeskOnFocus } from '../actions/desks';

import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { NotFound } from '../NotFound/NotFound';
import { DeskContent } from './DeskContent';
import { searchDeskInCache } from './searchDeskInCache';


function DeskPage() {

  const [ {desks}, dispatch] = useStateValue();
  const { match } = useReactRouter();

  const deskId = match.params.id;
  //search in existing collection first
  const deskOnFocus = searchDeskInCache(desks.deskCollection, deskId) || desks.deskOnFocus;
  const error = desks.errorOnFocus;

  useEffect(() => {
    const validId = Number(deskId);
    if(!deskOnFocus || deskOnFocus.id !== validId) // wasnt found in cache or focuse deck has wrong id
      dispatch(getDeskById(deskId));
    else if(deskOnFocus && !desks.deskOnFocus) // was found in cache but need to set it on focus
      dispatch(setDeskOnFocus(deskOnFocus));
  }, [deskId, deskOnFocus, desks.deskOnFocus, dispatch])

  const isLoading = !deskOnFocus && !error;

  function renderPageContent(){
    return (
    <React.Fragment>
      {error ? <NotFound error={error}/> : <DeskContent desk={deskOnFocus}/>}
    </React.Fragment>);
  }

  return (
  <DndProvider backend={HTML5Backend}>
    <div className="content__main-section">
      {isLoading ? 
        <h1 className="content__heading">Loading...</h1> :
        renderPageContent()
      }
    </div>
  </DndProvider>);
}
export default DeskPage;