import React, { useEffect} from 'react';
import useReactRouter from 'use-react-router';
import { useStateValue } from '../hooks';
import { getDeskById, setDeskOnFocus } from '../actions/desks';


function NotFound({error}){
  return (
    <h1 className="content__heading">{error}...</h1>
  );
}

function DeskContent({desk}){
  return (
  <React.Fragment>
    <h1 className="content__heading">{desk.deskname}</h1>
  </React.Fragment>);
}

function searchDeskInCache(collection, deskId){
  const validId = Number(deskId);

  if(isNaN(validId)) return null;
  const filteredCollection = collection.filter((item) => item.id === validId);
  const wasFound = filteredCollection.length !== 0;

  return wasFound ? filteredCollection[0] : null;
}

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
  <div className="content__main-section">
    {isLoading ? 
      <h1 className="content__heading">Loading...</h1> :
      renderPageContent()
    }
  </div>);
}

export default DeskPage;