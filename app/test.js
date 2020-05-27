const fetch = require("node-fetch");

var headers = new fetch.Headers()

headers.append('Accept', 'application/json'); // This one is enough for GET requests
headers.append('Content-Type', 'application/json'); // This one sends body

fetch('http://127.0.0.1:5000/2', {
    method: 'GET',
    mode: 'same-origin',
    credentials: 'include',
    redirect: 'follow',
    headers: headers
}).then(response => console.log(response))
    .then(resp => {
        console.log(resp)
    }).catch(err => {
        console.log(err)
    })