import { reducer as themeReducer, initialState as themeInitialState } from './theme';

export const initialState = {
  theme : themeInitialState
}
export const mainReducer = ({ theme }, action) => ({
  theme: themeReducer(theme, action)
});
