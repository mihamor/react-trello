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

export const GET_DESK_BY_ID = 'GET_DESK_BY_ID';
export function getDeskById(id){
  // eslint-disable-next-line no-console
  console.log("in action get by id");
  const data = MyStorage.getItemById(id);
  return { 
    type: GET_DESK_BY_ID,
    deskOnFocus : data.item,
    errorOnFocus : data.error
  }; 
}

export const SET_DESK_ON_FOCUS = 'SET_DESK_ON_FOCUS';
export function setDeskOnFocus(desk){
  return { 
    type: SET_DESK_ON_FOCUS,
    deskOnFocus : desk,
  }; 
}

export const CREATE_SECTION = 'CREATE_SECTION';
export function createSection(deskId, newSection){
  const data = MyStorage.insertSection(deskId, newSection);
  return { 
    type: CREATE_SECTION,
    deskOnFocus : data.newItemOnFocus,
    deskCollection : data.newCollection,
    errorOnFocus : data.error
  }; 
}

export const CREATE_CARD = 'CREATE_CARD';
export function createCard(deskId, sectionId, newCard){
  const data = MyStorage.insertCard(deskId, sectionId, newCard);
  return { 
    type: CREATE_CARD,
    deskOnFocus : data.newItemOnFocus,
    deskCollection : data.newCollection,
    errorOnFocus : data.error
  }; 
}

export const MOVE_CARD = 'MOVE_CARD';
export function moveCard(reqObject){
  const data = MyStorage.moveCard(reqObject);
  return { 
    type: MOVE_CARD,
    deskOnFocus : data.newItemOnFocus,
    deskCollection : data.newCollection,
    errorOnFocus : data.error
  }; 
}