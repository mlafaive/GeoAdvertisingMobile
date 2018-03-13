export function token(state = {}, action) {
  switch (action.type) {
    case 'ACCESS_TOKEN':
      return {
      	access_token: action.access_token,
      	refresh_token: state.refresh_token
      }
    case 'REFRESH_TOKEN':
      return {
      	access_token: state.access_token,
      	refresh_token: action.refresh_token
      }
    default:
      return state;
  }
}