import React, { useState } from 'react';
import { CreationSection } from './CreationSection';
import { CreationSectionButton } from './CreationSectionButton';

export function CreationSectionContainer({ desk }) {
  const [showForm, setFormShow] = useState(false);
  const renderSectionContainer = () => {
    return showForm ?
      <CreationSection desk={desk} setFormShow={setFormShow} /> :
      <CreationSectionButton setFormShow={setFormShow} />;
  };
  return renderSectionContainer();
}
