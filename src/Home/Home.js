import React, { useState, useRef, useEffect} from 'react';
import { useForm, useStateValue } from '../hooks';
import useReactRouter from 'use-react-router';
import { createDesk, getAllDesks, deleteDeskById } from '../actions/desks';

function CreationButton({setFormShow}){
  return (
  <div className="desk__create desk_pointed" onClick={() => setFormShow(true)}>
    <div className="desk__create-content">
      <h1 className="desk__heading">Create new desk...</h1>
    </div>
  </div>)
}

function CreationForm({setFormShow}){

  const { values, errors, onChange, onSubmit } = useForm(
    addDeskFromForm,
    { deskname: '' },
    validateDeskName
  );

  const deskNameInput = useRef(null);
  const dispatch = useStateValue()[1];

  function validateDeskName (values){
    let errors = {};
    if (values.deskname.trim() === '') {
      errors.deskname = 'Name of the desk should not be empty';
    }
    return errors;
  }

  function addDeskFromForm(){
    // add desk to context
    const newDesk = { 
      deskname : values.deskname
    }
    dispatch(createDesk(newDesk));
    setFormShow(false);
  }

  return (
  <div className="desk__create">
    <div className="desk__create-content">
      <form className="create-form" onSubmit={onSubmit}>
        <h1 className="create-form__heading">What shall we call the desk?</h1>
        <input
          type="text"
          className={`create-form__input ${errors.deskname && 'create-form__input_invalid'}`}
          name="deskname"
          placeholder="Desk name.."
          value={values.deskname}
          ref={deskNameInput}
          onChange={onChange}
        />
        {errors.deskname ? <span className="error-info">{errors.deskname}...</span> : null}
        <div className="create-form__button-container">
          <button className="create-form__button" type="button" onClick={() => setFormShow(false)}>Cancel</button>
          <button className="create-form__button create-form__button_submit" type="submit">Sumbit</button>
        </div>
      </form>
    </div>
  </div>)
}

function CreationDeskContainer(){
  const [showForm, setFormShow] = useState(false);

  const renderDeskContainer = () => {
    return showForm ? 
      <CreationForm setFormShow={setFormShow}/> :
      <CreationButton setFormShow={setFormShow}/>;
  }
  return renderDeskContainer();
}

function Desk({desk, onDelete, fadeOutTime = 500}){

  const [fadeOut, setFadeOut] = useState(false);
  const { history } = useReactRouter();

  function innerOnDelete(e){
    //fade out first
    e.stopPropagation()
    setFadeOut(true);
    setTimeout(onDelete, fadeOutTime);
  }

  function onDeskClick(){
    const distUrl = `/desk/${desk.id}`;
    history.push(distUrl);
  }
  
  return (
  <div onClick={onDeskClick} className={`desk desk_pointed ${fadeOut ? "desk_fadeout" : ""}`} >
    <div className="desk__delete" onClick={innerOnDelete}>&#10005;</div>
    <div className="desk__content">
      <h1 className="desk__heading">{desk.deskname}</h1>
    </div>
  </div>); 
}

function Home (){

  const [{desks}, dispatch] = useStateValue();
  const deskCollection = desks.deskCollection;

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("getting all desks");
    dispatch(getAllDesks());
  }, [dispatch]);

  function deleteDesk(id) {
    dispatch(deleteDeskById(id));
  }

  return (
    <div className="content__main-section">
      <h1 className="content__heading">Create your task!</h1>
      <div className="desk__container">
        <CreationDeskContainer/>
        {deskCollection.map((item) => (
          <Desk
            key={item.id}
            desk={item}
            onDelete={() => deleteDesk(item.id)}
            fadeOutTime={500}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;