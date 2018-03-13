export function email(state = '', action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return action.email
    default:
      return state;
  }
}