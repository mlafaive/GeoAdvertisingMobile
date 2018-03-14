import store from '../store/Store.js';
import { setAccessToken } from '../actions/token.js';

const base_url = 'https://geo-advertising.herokuapp.com/api';

// tooling modules
function refresh_token(method, path, body) {
  let token = store.getState().token.refresh_token;
  let url = base_url + '/refresh';
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };
  return fetch(url, { 
    method: 'POST', 
    headers: headers,
    body: JSON.stringify({})
  })
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  })
  .then((data) => {
    store.dispatch(setAccessToken(data.access_token));
    headers.Authorization = 'Bearer ' + data.access_token;
    url = base_url + path;
    let config = {
      method: method,
      headers: headers,
    };
    if (body !== undefined) {
      config.body = body;
    }
    return fetch(url, config);
  })
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function GET(path) {
  let token = store.getState().token.access_token;
  let url = base_url + path;
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token !== undefined) {
    headers.Authorization = 'Bearer ' + token;
  }
  
  return fetch(url, { 
    method: 'GET', 
    headers: headers
  })
  .then((res) => {
    if (res.status === 401) {
      return refresh_token('GET', path);
    }
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function POST(path, data) {
  let token = store.getState().token.access_token;
  let url = base_url + path;
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token !== undefined) {
    headers.Authorization = 'Bearer ' + token;
  }
  let body = JSON.stringify(data);
  
  return fetch(url, { 
    method: 'POST', 
    headers: headers,
    body: body
  })
  .then((res) => {
    if (res.status === 401) {
      return refresh_token('POST', path, body);
    }
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function PATCH(path, data) {
  let token = store.getState().token.access_token;
  let url = base_url + path;
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token !== undefined) {
    headers.Authorization = 'Bearer ' + token;
  }
  let body = JSON.stringify(data);
  
  return fetch(url, { 
    method: 'PATCH', 
    headers: headers,
    body: body
  })
  .then((res) => {
    if (res.status === 401) {
      return refresh_token('PATCH', path, body);
    }
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function DELETE(path) {
  let token = store.getState().token.access_token;
  let url = base_url + path;
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token !== undefined) {
    headers.Authorization = 'Bearer ' + token;
  }

  return fetch(url, { 
    method: 'DELETE', 
    headers: headers
  })
  .then((res) => {
    if (res.status === 401) {
      return refresh_token('DELETE', path);
    }
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}


export { GET, POST, PATCH, DELETE };
