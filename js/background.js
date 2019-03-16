//confirmed este alerta aparece a meio da janela
//window.alert("teste");
const MAX_TIME = 3600; //em segundos   3600s -> 1h
var timer = 0;
var t = setInterval(runEverySecond, 1000);

/*chrome.tabs.onUpdated.addListener(function(info){
  getAllOpenWindows(window);
});*/

function runEverySecond(){
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    //console.log("tabs: " + tabs)
    if(tabs.length != 0){
      isBlacklistedUrlOpen(getURLDomain(tabs[0].url))
    }
    //console.log("timer: " + timer);
  })

  if(timer == MAX_TIME)
  {
    alert("test boi");
    timer -= MAX_TIME; // timer = 0 doesn't reset it god bless
  }
}


//confirmed this changes the icon
chrome.browserAction.setIcon({
  path: "images/green_128.png" //any icon in the folder
});

function isBlacklistedUrlOpen(currentUrl){
  let blacklist = []
  let aux = localStorage.getItem('blacklist')
  blacklist = aux == null ? blacklist : JSON.parse(aux)

  for(let i=0; i<blacklist.length; i++)
  {
    // if it ends with '.com/' then make '.com'
    if (currentUrl[currentUrl.length-1] === '/'){
      currentUrl.splice(currentUrl.length-1, 1)
    }
    //console.log("site: " + blacklist[i]);
    //console.log("current: " + currentUrl);
    if(currentUrl === blacklist[i])
      timer++;
  }
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