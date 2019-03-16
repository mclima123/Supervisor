//confirmed este alerta aparece a meio da janela
//window.alert("teste");

var timer = 0;
var t = setInterval(runEverySecond, 1000);

/*chrome.tabs.onUpdated.addListener(function(info){
  getAllOpenWindows(window);
});*/

function runEverySecond(){
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs)
    if(tabs.length != 0){
      isBlacklistedUrlOpen(tabs[0])
    }
    console.log(timer);
  });
}

function isBlacklistedUrlOpen(current_tab){
  let blacklist = []
  let aux = localStorage.getItem('blacklist')
  //console.log("aux: "+aux);
  blacklist = aux == null ? blacklist : JSON.parse(aux)
  if(aux != null){
    blacklist = aux;}
  //console.log("blacklist: "+blacklist);

  for(var i=0; i<blacklist.length; i++)
  {
    console.log("site: " + blacklist[i]);
    console.log("current: " + current_tab.url);
    if(current_tab.url === blacklist[i])
      timer++;
  }
}

function getURLDomain(url){
  var splits = url.split("://")       // http + <rest of the url>
  var splits2 = splits[1].split("/")  // site.com + page identifier
  return splits[0] + "://" + splits2[0];
}