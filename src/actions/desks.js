import MyStorage from '../storage/storage';

export const CREATE_DESK = 'CREATE_DESK';
export function createDesk(newDesk){
  const deskCollection = MyStorage.insertNewItem(newDesk); 
  return { 
    type: CREATE_DESK,
    deskCollection 
  }; 
}

export const GET_ALL_DESKS = 'GET_ALL_DESKS';
export function getAllDesks(){
  const deskCollection = MyStorage.getCollection();
  return { 
    type: GET_ALL_DESKS,
    deskCollection
  }; 
}

export const DELETE_DESK = 'DELETE_DESK';
export function deleteDeskById(id){
  const deletedDesk = MyStorage.deleteItemById(id);
  const newDeskCollection = MyStorage.getCollection();
  return { 
    type: DELETE_DESK,
    deletedDesk,
    deskCollection : newDeskCollection
  }; 
}
