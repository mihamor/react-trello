import React from 'react';

export function CreationSectionButton({ setFormShow }) {
  return (<div className="create-section section_pointed" onClick={() => setFormShow(true)}>
    <div className="create-section__content">
      <h1 className="section__heading section__heading_white">Create new list</h1>
    </div>
  </div>);
}
