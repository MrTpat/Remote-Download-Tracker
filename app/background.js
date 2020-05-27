
const sendUpdate = (items) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", SERVER_URL, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        reqbody = { all_downloads: items, id: ID }
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject(request.statusText);
            }
        };
        request.onerror = () => {
            reject(request.statusText)
        };
        request.send(JSON.stringify(reqbody));
    });
}

const isChanged = (new_obj) => {
    if (typeof isChanged.last == 'undefined') {
        isChanged.last = [];
    }
    if (JSON.stringify(new_obj) == JSON.stringify(isChanged.last)) {
        return false;
    } else {
        isChanged.last = new_obj;
        return true;
    }
}
const updateActiveDownloads = () => {
    chrome.downloads.search({ state: 'in_progress' }, function (items) {
        if (isChanged(items)) {
            sendUpdate(items).then((success) => { }).catch((err) => { console.log(err) })
        }
    });

}
const getNewID = () => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", SERVER_URL + 'getID', true);
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

const SERVER_URL = "http://127.0.0.1:5000/";
var ID = -1;
getNewID().then((res) => {
    ID = res.id;
    localStorage.setItem('id', ID);
    console.log('ID: ' + ID)
    setInterval(updateActiveDownloads, 5000);
}).catch((err) => {
    console.error('Could not obtain the ID!')
});


// function getOpeningIds() {
//     var ids = [];
//     try {
//         ids = JSON.parse(localStorage.openWhenComplete);
//     } catch (e) {
//         localStorage.openWhenComplete = JSON.stringify(ids);
//     }
//     return ids;
// }
// function setOpeningIds(ids) {
//     localStorage.openWhenComplete = JSON.stringify(ids);
// }
// chrome.downloads.onChanged.addListener(function (delta) {
//     if (!delta.state ||
//         (delta.state.current != 'complete')) {
//         return;
//     }
//     var ids = getOpeningIds();
//     if (ids.indexOf(delta.id) < 0) {
//         return;
//     }
//     chrome.downloads.open(delta.id);
//     ids.splice(ids.indexOf(delta.id), 1);
//     setOpeningIds(ids);
// });

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//     chrome.downloads.download({ url: info.linkUrl }, function (downloadId) {
//         var ids = getOpeningIds();
//         if (ids.indexOf(downloadId) >= 0) {
//             return;
//         }
//         ids.push(downloadId);
//         setOpeningIds(ids);
//     });
// });
// chrome.contextMenus.create({
//     id: 'open',
//     title: chrome.i18n.getMessage('openContextMenuTitle'),
//     contexts: ['link'],
// });