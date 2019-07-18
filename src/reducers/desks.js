import { CREATE_DESK, GET_ALL_DESKS, DELETE_DESK } from '../actions/desks';

export const initialState = {
  deskCollection: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DESK:
    case GET_ALL_DESKS:
    case DELETE_DESK:
      return {
        ...state,
        deskCollection: action.deskCollection
      };
    default:
      return state;
  }
};