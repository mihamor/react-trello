import React, { useEffect, useState, useRef, useCallback } from 'react';
import useReactRouter from 'use-react-router';
import { useStateValue, useForm } from '../hooks';
import { getDeskById, setDeskOnFocus, createSection, createCard, moveCard } from '../actions/desks';

import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useDrag, useDrop } from "react-dnd";


function NotFound({error}){
  return (
    <h1 className="content__heading">{error}...</h1>
  );
}

function CreationSection({setFormShow, desk}){

  const { values, errors, onChange, onSubmit } = useForm(
    addSectionFromForm,
    { sectionName: '' },
    validateSectionName
  );

  const sectionNameInput = useRef(null);
  const dispatch = useStateValue()[1];

  function validateSectionName (values){
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

function Card({card, section, desk}){
  
  const cardType = "card";
  const drag = useDrag({
    item: { card,
      moveFrom: section.id,
      deskId : desk.id,
      type : cardType 
    }
  })[1];

  return (
  <div className="card" ref={drag}>
    <h1 className="card__heading">{card.cardName}</h1>
  </div>);

}

function DroppableSectionArea({section, children}){

  const dispatch = useStateValue()[1];

  const appendItem = useCallback(
    item => {
      item.moveTo = section.id;
      dispatch(moveCard(item));
    }, [section.id, dispatch]);

  const [collectedProps, drop] = useDrop({
    accept: "card",
    drop: appendItem,
    collect: monitor => {
      return {
        hovered: monitor.isOver()
      };
    }
  });

  return(
  <div
    className={`section ${collectedProps.hovered ? "section_hovered" : ""}`}
    ref={drop}
  >
    {children}
  </div>);
}


function Section({section, desk}){

  const [placeholder, setPlaceholder] = useState("");
  const defaultPlaceholderText = "What needs to be done?...";

  const { values, errors, onChange, onSubmit } = useForm(
    addCardFromForm,
    { cardName: '' },
    validateCardName
  );

  const cardNameInput = useRef(null);
  const dispatch = useStateValue()[1];

  function validateCardName (values){
    let errors = {};
    if (values.cardName.trim() === '') {
      errors.cardName = 'Name of the card should not be empty';
    }
    return errors;
  }

  function addCardFromForm(){
    //add section to context
    const newCard = {
      cardName : values.cardName
    }
    dispatch(createCard(desk.id, section.id, newCard));
  }

  function handleEnterPress(event) {
    if(event.key === 'Enter'){
      //pass event to submit callback
      onSubmit(event)
    }
  }

  return (
    <DroppableSectionArea section={section} desk={desk}>
      <h1 className="section__heading section__heading_black">{section.sectionName}</h1>
      <hr/>
      <input
        type="text"
        className={`section__name-input`}
        name="cardName"
        placeholder={placeholder}
        onFocus={() => setPlaceholder(defaultPlaceholderText)}
        onBlur={() => setPlaceholder("")}
        ref={cardNameInput}
        onChange={onChange}
        value={values.cardName}
        onKeyPress={handleEnterPress}
      />
      {errors.cardName ? errors.cardName : null}
      {section.cards.map((card) => (
        <Card 
          key={card.id}
          card={card}
          section={section}
          desk={desk}
        />))}
    </DroppableSectionArea>
  );
}


function SectionList({desk}){

  //const {desks} = useStateValue()[0];
  
  return (
    <div className="section__container">
      {desk.sections.map((section) =>(
      <Section 
        section={section} 
        key={section.id} 
        desk={desk}
      />))}
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

  if(isNaN(validId) || !collection) return null;
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