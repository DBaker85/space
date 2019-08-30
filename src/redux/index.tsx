import { combineReducers } from 'redux';

import { stars } from './reducers';

const rootReducer = combineReducers({
  stars
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
