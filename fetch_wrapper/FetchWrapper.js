const base_url = 'http://localhost:3000/api';

function GET(path) {
  let url = base_url + path;
  return fetch(url, { 
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function POST(path, data) {
  let url = base_url + path;
  return fetch(url, { 
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function PATCH(path, data) {
  let url = base_url + path;
  return fetch(url, { 
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

function DELETE(path) {
  let url = base_url + path;
  return fetch(url, { 
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}


export { GET, POST, PATCH, DELETE };
