import React, { useState } from 'react';
import { CreationButton } from './CreationButton';
import { CreationForm } from './CreationForm';

export function CreationDeskContainer() {
  const [showForm, setFormShow] = useState(false);
  const renderDeskContainer = () => {
    return showForm ?
      <CreationForm setFormShow={setFormShow} /> :
      <CreationButton setFormShow={setFormShow} />;
  };
  return renderDeskContainer();
}
