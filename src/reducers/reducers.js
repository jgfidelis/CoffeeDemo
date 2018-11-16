import { combineReducers } from 'redux';

import nearby from './nearby';
import featured from './featured';

export default combineReducers({
  nearby,
  featured,
});
