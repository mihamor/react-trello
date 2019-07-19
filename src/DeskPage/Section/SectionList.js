import React from 'react';
import { CreationSectionContainer } from './CreationSectionContainer';
import { Section } from './Section';

export function SectionList({ desk }) {
  return (<div className="section__container">
    {desk.sections.map((section) => (<Section section={section} key={section.id} desk={desk} />))}
    <CreationSectionContainer desk={desk} />
  </div>);
}
