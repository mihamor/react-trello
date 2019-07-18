
export const initialState = {
  theme: { primary: 'green' }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme
      };
    default:
      return state;
  }
};
