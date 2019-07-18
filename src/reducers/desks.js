import { 
  CREATE_DESK,
  GET_ALL_DESKS, 
  DELETE_DESK, 
  GET_DESK_BY_ID, 
  SET_DESK_ON_FOCUS, 
  CREATE_SECTION
} from '../actions/desks';

export const initialState = {
  deskCollection: [],
  deskOnFocus: null,
  errorOnFocus: null
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
    case GET_DESK_BY_ID: 
      return {
        ...state,
        deskOnFocus: action.deskOnFocus,
        errorOnFocus: action.errorOnFocus
      };
    case SET_DESK_ON_FOCUS: 
      return {
        ...state,
        deskOnFocus: action.deskOnFocus,
      };
    case CREATE_SECTION: 
      return {
        ...state,
        deskOnFocus: action.deskOnFocus,
        deskCollection : action.deskCollection,
        errorOnFocus : action.errorOnFocus
      };
    default:
      return state;
  }
};