import React, { useState, useRef } from 'react';
import { useStateValue, useForm } from '../../hooks';
import { createCard } from '../../actions/desks';
import { Card } from '../Card/Card';
import { DroppableSectionArea } from './DroppableSectionArea';

export function Section({ section, desk }) {
  const [placeholder, setPlaceholder] = useState("");
  const defaultPlaceholderText = "What needs to be done?...";
  const { values, errors, onChange, onSubmit } = useForm(addCardFromForm, { cardName: '' }, validateCardName);
  const cardNameInput = useRef(null);
  const dispatch = useStateValue()[1];
  function validateCardName(values) {
    let errors = {};
    if (values.cardName.trim() === '') {
      errors.cardName = 'Name of the card should not be empty';
    }
    return errors;
  }
  function addCardFromForm() {
    //add section to context
    const newCard = {
      cardName: values.cardName
    };
    dispatch(createCard(desk.id, section.id, newCard));
  }
  function handleEnterPress(event) {
    if (event.key === 'Enter') {
      //pass event to submit callback
      onSubmit(event);
    }
  }
  return (<DroppableSectionArea section={section} desk={desk}>
    <h1 className="section__heading section__heading_black">{section.sectionName}</h1>
    <hr />
    <input type="text" className={`section__name-input`} name="cardName" placeholder={placeholder} onFocus={() => setPlaceholder(defaultPlaceholderText)} onBlur={() => setPlaceholder("")} ref={cardNameInput} onChange={onChange} value={values.cardName} onKeyPress={handleEnterPress} />
    {errors.cardName ? errors.cardName : null}
    {section.cards.map((card) => (<Card key={card.id} card={card} section={section} desk={desk} />))}
  </DroppableSectionArea>);
}
