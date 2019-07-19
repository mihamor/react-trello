import React from 'react';

export function CreationButton({ setFormShow }) {
  return (<div className="desk__create desk_pointed" onClick={() => setFormShow(true)}>
    <div className="desk__create-content">
      <h1 className="desk__heading">Create new desk...</h1>
    </div>
  </div>);
}
