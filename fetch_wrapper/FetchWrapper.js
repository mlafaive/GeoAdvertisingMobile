const base_url = 'http://localhost:3000/api';

function GET(path, token) {
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
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function POST(path, data, token) {
  let url = base_url + path;
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token !== undefined) {
    headers.Authorization = 'Bearer ' + token;
  }
  
  return fetch(url, { 
    method: 'POST', 
    headers: headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function PATCH(path, data, token) {
  let url = base_url + path;
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token !== undefined) {
    headers.Authorization = 'Bearer ' + token;
  }
  
  return fetch(url, { 
    method: 'PATCH', 
    headers: headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function DELETE(path, token) {
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
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}


export { GET, POST, PATCH, DELETE };
