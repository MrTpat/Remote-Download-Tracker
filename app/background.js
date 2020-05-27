
const sendUpdate = (items) => {
    const request = new XMLHttpRequest();
    request.open("POST", SERVER_URL, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    reqbody = { all_downloads: items }
    request.send(JSON.stringify(reqbody));
}

const isChanged = (new_obj) => {
    if (typeof isChanged.last == 'undefined') {
        isChanged.last = [];
    }
    if (JSON.stringify(new_obj) == JSON.stringify(isChanged.last)) {
        return false;
    } else {
        isChanged.last = new_obj;
        console.log("UPDATED!")
        return true;
    }
}
const updateActiveDownloads = () => {
    chrome.downloads.search({state: 'in_progress'}, function (items) {
        if (isChanged(items)) {
            sendUpdate(items);
        }
    });
    
}
const getNewID = new Promise((resolve, reject) => {
    //make request
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            console.log(request.response)
        }
    }
    request.open("GET", SERVER_URL + '/getID', true);
    request.send();
})
const ID = getNewID();
const SERVER_URL = "http://127.0.0.1:5000/"
setInterval(updateActiveDownloads, 5000);
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