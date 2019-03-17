let blacklist = [];
let defaults = [
  "www.facebook.com",
  "www.instagram.com",
  "twitter.com"
];

initialize();



//--------------------------//

function removeFromBlacklist() {
  let website = document.getElementById('website_input').value;

  if (blacklist.includes(website) && website !== "") {
    blacklist.splice(blacklist.indexOf(website), 1);
    saveBlacklist();
    clearULList();
    populateList();
    document.getElementById('website_input').value = '';
  }

  console.log(blacklist);
}

function clearULList() {
  document.getElementById("append_here").remove();
  let new_list = document.createElement("ul");
  new_list.className = "list-group";
  new_list.id = "append_here";
  document.getElementById("blacklisted_sites_list").appendChild(new_list);
}

function initialize() {
  getBlacklist();

  if (localStorage.getItem('firstTime') !== 'false') {
    addDefaults();
    localStorage.setItem('firstTime', false);
  }

  populateList();

  document.getElementById('add_to_blacklist').addEventListener("click", addToBlacklist);
  document.getElementById('remove_from_blacklist').addEventListener("click", removeFromBlacklist);
  document.getElementById('title').addEventListener("click", clearStorage);
}

function getBlacklist() {
  let aux = localStorage.getItem('blacklist');
  blacklist = aux == null ? blacklist : JSON.parse(aux);

  console.log(blacklist);
}

function addToBlacklist() {
  let website = document.getElementById('website_input').value;
  
  if(website[website.length-1] != '/'){
    website += "/";
  }

  website = getURLDomain(website);

  if (!blacklist.includes(website) && website !== "") {
    blacklist.push(website);
    saveBlacklist();
    clearULList();
    populateList();
    document.getElementById('website_input').value = '';
  }

  console.log(blacklist);
}

function clearStorage() {
  localStorage.clear(); //clear storage
  blacklist = []; //clear the array
  clearULList(); //clear the ul list
  localStorage.setItem('firstTime', false);
}

function saveBlacklist() {
  localStorage.setItem('blacklist', JSON.stringify(blacklist));
}

function addDefaults() {
  defaults.forEach(element => {
    if (!blacklist.includes(element)) {
      blacklist.push(element);
    }
  });

  saveBlacklist();
}

function populateList() {
  let list = document.getElementById('append_here');

  blacklist.forEach(element => {
    let child = document.createElement("li");
    child.innerHTML = "<div id='id_placeholder'>" + element + "</div>"
    child.className = "list-group-item list-group-item-warning";
    child.id = element;
    list.append(child);
  });
}

function getURLDomain(url)
{
  var splitsHttp = url.split("://")       // http + <rest of the url>
  var splitsWww = "";
  if(splitsHttp[0].length == url.length){
    splitsWww = url.split("/");
  }
  else{
    splitsWww = splitsHttp[1].split("/")  // site.com + page identifier
  }

  return splitsWww[0];
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