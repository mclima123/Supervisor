//confirmed este alerta aparece a meio da janela
//window.alert("teste");
const MAX_TIME = 60; //em segundos
var timer = 0;
var t = setInterval(runEverySecond, 1000);

/*chrome.tabs.onUpdated.addListener(function(info){
  getAllOpenWindows(window);
});*/

function runEverySecond() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log("tabs: " + tabs)
    if (tabs.length != 0) {
      isBlacklistedUrlOpen(tabs[0])
    }
    console.log("timer: " + timer);
  })
}

//confirmed this changes the icon
chrome.browserAction.setIcon({
  path: "images/green_128.png" //any icon in the folder
});

if (timer == MAX_TIME) {
  alert("test boi");
  timer -= MAX_TIME; // timer = 0 doesn't reset it god bless
}

function isBlacklistedUrlOpen(current_tab) {
  let blacklist = []
  let aux = localStorage.getItem('blacklist')
  blacklist = aux == null ? blacklist : JSON.parse(aux)

  for (let i = 0; i < blacklist.length; i++) {
    console.log("site: " + blacklist[i]);
    console.log("current: " + current_tab.url);
    if (current_tab.url === blacklist[i])
      timer++;
  }
}

function getURLDomain(url) {
  var splits = url.split("://")       // http + <rest of the url>
  var splits2 = splits[1].split("/")  // site.com + page identifier
  return splits[0] + "://" + splits2[0];
}


//----------------------------------------------------------------------------//
