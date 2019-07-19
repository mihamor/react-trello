import React, { useState } from 'react';
import useReactRouter from 'use-react-router';

export function DeskPreview({ desk, onDelete, fadeOutTime = 500 }) {
  const [fadeOut, setFadeOut] = useState(false);
  const { history } = useReactRouter();
  function innerOnDelete(e) {
    //fade out first
    e.stopPropagation();
    setFadeOut(true);
    setTimeout(onDelete, fadeOutTime);
  }
  function onDeskClick() {
    const distUrl = `/desk/${desk.id}`;
    history.push(distUrl);
  }
  return (<div onClick={onDeskClick} className={`desk desk_pointed ${fadeOut ? "desk_fadeout" : ""}`}>
    <div className="desk__delete" onClick={innerOnDelete}>&#10005;</div>
    <div className="desk__content">
      <h1 className="desk__heading">{desk.deskname}</h1>
    </div>
  </div>);
}
