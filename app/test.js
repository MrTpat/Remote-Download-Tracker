var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const getNewID = () => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", SERVER_URL + '/getID', true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}
const SERVER_URL = "http://127.0.0.1:5000"
getNewID().then((dat) => {
    console.log(dat)
    console.log('test')
}).catch((err) => {
    console.log(err)
    console.log('test')
})
