import React from 'react';
import { SectionList } from './Section/SectionList';

export function DeskContent({ desk }) {
  return (<React.Fragment>
    <h1 className="content__heading">{desk.deskname}</h1>
    <SectionList desk={desk} />
  </React.Fragment>);
}
