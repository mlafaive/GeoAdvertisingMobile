import { combineReducers } from 'redux';

import { token } from './token';
import { email } from './email';
import { user } from './user';
import { interests } from './interests';
import { businesses } from './businesses';

const reducer = combineReducers({
  token: token,
  email: email,
  user: user,
  interests: interests,
  businesses: businesses
});

export default reducer;
