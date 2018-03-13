import { combineReducers } from 'redux';

import { token } from './token';
import { email } from './email';

const reducer = combineReducers({
  token: token,
  email: email
});

export default reducer;
