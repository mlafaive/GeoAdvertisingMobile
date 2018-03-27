export function setUser(user) {
  return {
    type: 'SET_USER',
    user: user,
  };
}

export function clearUser() {
  return {
    type: 'CLEAR_USER',
  };
}