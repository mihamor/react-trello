import React, { useEffect} from 'react';
import { useStateValue } from '../hooks';
import { getAllDesks, deleteDeskById } from '../actions/desks';
import { CreationDeskContainer } from './CreationDeskContainer';
import { DeskPreview } from './DeskPreview';

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
      <h1 className="content__heading content__heading_emoji">Create your task!</h1>
      <div className="desk__container">
        <CreationDeskContainer/>
        {deskCollection.map((item) => (
          <DeskPreview
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