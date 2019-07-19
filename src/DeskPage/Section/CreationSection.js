import React, { useRef } from 'react';
import { useStateValue, useForm } from '../../hooks';
import { createSection } from '../../actions/desks';

export function CreationSection({ setFormShow, desk }) {
  const { values, errors, onChange, onSubmit } = useForm(addSectionFromForm, { sectionName: '' }, validateSectionName);
  const sectionNameInput = useRef(null);
  const dispatch = useStateValue()[1];
  function validateSectionName(values) {
    let errors = {};
    if (values.sectionName.trim() === '') {
      errors.sectionName = 'Name of the section should not be empty';
    }
    return errors;
  }
  function addSectionFromForm() {
    // add section to context
    const newList = {
      sectionName: values.sectionName
    };
    dispatch(createSection(desk.id, newList));
    setFormShow(false);
  }
  return (<form className="section" onSubmit={onSubmit}>
    <input type="text" className={`section__name-input ${errors.listname && 'section__input_invalid'}`} name="sectionName" placeholder="List name..." value={values.sectionName} ref={sectionNameInput} onChange={onChange} />
    {errors.sectionName ? <span className="error-info error-info_black">{errors.sectionName}...</span> : null}
    <hr />
    <div className="create-form__button-container">
      <button className="section__button" type="button" onClick={() => setFormShow(false)}>Cancel</button>
      <button className="section__button" type="submit">Submit</button>
    </div>
  </form>);
}
