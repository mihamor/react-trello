import React from 'react';
import { useDrag } from "react-dnd";

export function Card({ card, section, desk }) {
  const cardType = "card";
  const drag = useDrag({
    item: {
      card,
      moveFrom: section.id,
      deskId: desk.id,
      type: cardType
    }
  })[1];
  return (<div className="card" ref={drag}>
    <h1 className="card__heading">{card.cardName}</h1>
  </div>);
}
