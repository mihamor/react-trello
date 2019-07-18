import React, { useEffect, useState, useRef } from 'react';
import useReactRouter from 'use-react-router';
import { useStateValue, useForm } from '../hooks';
import { getDeskById, setDeskOnFocus, createSection } from '../actions/desks';

function NotFound({error}){
  return (
    <h1 className="content__heading">{error}...</h1>
  );
}

function CreationSection({setFormShow, desk}){

  const { values, errors, onChange, onSubmit } = useForm(
    addSectionFromForm,
    { sectionName: '' },
    validateDeskName
  );

  const sectionNameInput = useRef(null);
  const dispatch = useStateValue()[1];

  function validateDeskName (values){
    let errors = {};
    if (values.sectionName.trim() === '') {
      errors.sectionName = 'Name of the section should not be empty';
    }
    return errors;
  }

  function addSectionFromForm(){
    // add section to context
    const newList = {
    
      sectionName : values.sectionName
    }
    dispatch(createSection(desk.id, newList));
    setFormShow(false);
  }

  return (
    <form className="section" onSubmit={onSubmit}>
      <input
        type="text"
        className={`section__name-input ${errors.listname && 'section__input_invalid'}`}
        name="sectionName"
        placeholder="List name..."
        value={values.sectionName}
        ref={sectionNameInput}
        onChange={onChange}
      />
      {errors.sectionName ? <span className="error-info error-info_black">{errors.sectionName}...</span> : null}
      <hr/>
      <div className="create-form__button-container">
        <button className="section__button" type="button" onClick={() => setFormShow(false)}>Cancel</button>
        <button className="section__button" type="submit">Submit</button>
      </div>
    </form>
  );
}

function CreationSectionButton({setFormShow}){
  return (
  <div className="create-section section_pointed" onClick={() => setFormShow(true)}>
    <div className="create-section__content">
      <h1 className="section__heading section__heading_white">Create new list</h1>
    </div>
  </div>)
}

function CreationSectionContainer({desk}){
  const [showForm, setFormShow] = useState(false);

  const renderSectionContainer = () => {
    return showForm ? 
      <CreationSection desk={desk} setFormShow={setFormShow}/> :
      <CreationSectionButton setFormShow={setFormShow}/>;
  }
  return renderSectionContainer();
}



function Section({section}){

  return (
    <div className="section">
      <h1 className="section__heading section__heading_black">{section.sectionName}</h1>
      <hr/>
    </div>
  );
}


function SectionList({desk}){

  //const {desks} = useStateValue()[0];
  
  return (
    <div className="section__container">
      {desk.sections.map((section) => <Section section={section} key={section.id}/>)}
      <CreationSectionContainer desk={desk}/> 
    </div>
  );
}

function DeskContent({desk}){
  return (
  <React.Fragment>
    <h1 className="content__heading">{desk.deskname}</h1>
    <SectionList desk={desk}/>
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