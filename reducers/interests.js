export function interests(state = null, action) {
  switch (action.type) {
    case 'SET_INTERESTS':
      return action.interests;
    default:
      return state;
  }
}