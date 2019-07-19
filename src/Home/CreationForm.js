import React, { useRef } from 'react';
import { useForm, useStateValue } from '../hooks';
import { createDesk } from '../actions/desks';

export function CreationForm({ setFormShow }) {
  const { values, errors, onChange, onSubmit } = useForm(addDeskFromForm, { deskname: '' }, validateDeskName);
  const deskNameInput = useRef(null);
  const dispatch = useStateValue()[1];
  function validateDeskName(values) {
    let errors = {};
    if (values.deskname.trim() === '') {
      errors.deskname = 'Name of the desk should not be empty';
    }
    return errors;
  }
  function addDeskFromForm() {
    // add desk to context
    const newDesk = {
      deskname: values.deskname
    };
    dispatch(createDesk(newDesk));
    setFormShow(false);
  }
  return (<div className="desk__create">
    <div className="desk__create-content">
      <form className="create-form" onSubmit={onSubmit}>
        <h1 className="create-form__heading">What shall we call the desk?</h1>
        <input type="text" className={`create-form__input ${errors.deskname && 'create-form__input_invalid'}`} name="deskname" placeholder="Desk name..." value={values.deskname} ref={deskNameInput} onChange={onChange} />
        {errors.deskname ? <span className="error-info">{errors.deskname}...</span> : null}
        <div className="create-form__button-container">
          <button className="create-form__button" type="button" onClick={() => setFormShow(false)}>Cancel</button>
          <button className="create-form__button_submit" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>);
}
