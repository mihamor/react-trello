import { reducer as themeReducer, initialState as themeInitialState } from './theme';
import { reducer as desksReducer, initialState as desksInitialState } from './desks';


export const initialState = {
  theme : themeInitialState,
  desks : desksInitialState
}
export const mainReducer = ({ theme , desks }, action) => ({
  theme : themeReducer(theme, action),
  desks : desksReducer(desks, action)
});
