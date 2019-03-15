let blacklist = [];
getBlacklist();

document.getElementById('add_to_blacklist').addEventListener("click", addToBlacklist);
document.getElementById('remove_from_blacklist').addEventListener("click", removeFromBlacklist);
document.getElementById('title').addEventListener("click", clearStorage);

function addToBlacklist() {
  let website = document.getElementById('website_input').value;

  if (!blacklist.includes(website)) {
    let list = document.getElementById('append_here');
    let child = document.createElement("div");
    child.innerHTML = "<li class='list-group-item list-group-item-success'><div id='website_name'>" + website + "</div><button id='removeButton'>remove</button></li>"
    blacklist.push(website);
    saveBlacklist();
    list.append(child);
    //console.log('teste');
  }
}

function removeFromBlacklist() {

}






//--------------------------//

function getBlacklist() {
  let aux = localStorage.getItem('blacklist');
  blacklist = aux == null ? blacklist : JSON.parse(aux);

  console.log(blacklist);
}

function clearStorage() {
  localStorage.clear();
  blacklist = [];
}

function saveBlacklist() {
  localStorage.setItem('blacklist', JSON.stringify(blacklist));
}

//--------------------------//


// --------- LINKS ÚTEIS --------- //
/*
https://stackoverflow.com/questions/8894461/updating-an-extension-button-dynamically-inspiration-required
-mudar o icon da extensão consoante o site e tempo em que está no site

https://scotch.io/@dongido/how-to-build-a-google-chrome-extension
-css and stuff

https://stackoverflow.com/questions/44712495/what-are-the-differences-between-page-action-and-browser-action
-browser actions vs page actions

https://developer.chrome.com/extensions/browserAction
-browser action

https://www.kirupa.com/html5/dynamically_create_populate_list.htm
-populate list

https://stackoverflow.com/questions/12395722/can-the-window-object-be-modified-from-a-chrome-extension
-access parent window

*/