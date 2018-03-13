export function setAccessToken(token) {
  return {
    type: 'ACCESS_TOKEN',
    access_token: token,
  };
}

export function setRefreshToken(token) {
  return {
    type: 'REFRESH_TOKEN',
    refresh_token: token,
  };
}


