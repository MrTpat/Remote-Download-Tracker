const getID = () => {
    if (localStorage.getItem('id') == null) {
        return;
    }
    document.getElementById('dl_id').innerText = "Visit the following link to track download status (works on any device):"
    document.getElementById('link').href = 'http://LBJames.pythonanywhere.com/' + localStorage.getItem('id')
    document.getElementById('link').innerText = 'http://LBJames.pythonanywhere.com/' + localStorage.getItem('id')
}
window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
      chrome.tabs.create({url:e.target.href})
    }
  })
getID();