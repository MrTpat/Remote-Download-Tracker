const getID = () => {
    if (localStorage.getItem('id') == null) {
        return;
    }
    document.getElementById('dl_id').innerText = "ID: " + localStorage.getItem('id')
}
setInterval(getID, 250);