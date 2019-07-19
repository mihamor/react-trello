import React, { useCallback } from 'react';
import { useStateValue } from '../../hooks';
import { moveCard } from '../../actions/desks';
import { useDrop } from "react-dnd";

export function DroppableSectionArea({ section, children }) {
  const dispatch = useStateValue()[1];
  const appendItem = useCallback(item => {
    item.moveTo = section.id;
    dispatch(moveCard(item));
  }, [section.id, dispatch]);
  const [collectedProps, drop] = useDrop({
    accept: "card",
    drop: appendItem,
    collect: monitor => {
      return {
        hovered: monitor.isOver()
      };
    }
  });
  return (<div className={`section ${collectedProps.hovered ? "section_hovered" : ""}`} ref={drop}>
    {children}
  </div>);
}
