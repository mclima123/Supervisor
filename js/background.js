//confirmed este alerta aparece a meio da janela
//window.alert("teste");
var timer = []
var tabs = []
var timerRunning = false;

//#region 
/*chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          //add social media sites here
          urlMatches: '(facebook|instagram|twitter).com',
        },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});*/
//#endregion

chrome.tabs.onUpdated.addListener(function(info){
  console.log("here");
});

chrome.windows.getAll({populate:true}, getAllOpenWindows);

function getAllOpenWindows(winData) {

  for (var i in winData) {
    if (winData[i].focused === true) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j=0; j<totTabs;j++) {
          if(winTabs[j].url.startsWith("http")){
            tabs.push(getURLDomain(winTabs[j].url));
            isBlacklistedUrlOpen();
          }
        }
    }
  }
  console.log(tabs);
}

function isBlacklistedUrlOpen(){
  let blacklist = [];
  let aux = localStorage.getItem('blacklist');
  blacklist = aux == null ? blacklist : JSON.parse(aux);

  for(var tab in tabs)
  {
    for(var site in blacklist)
    {
      if(tab == site)
        timerRunning = true;
    }
  }
}

function getURLDomain(url){
  var splits = url.split("://")       // http + <rest of the url>
  var splits2 = splits[1].split("/")  // site.com + page identifier
  return splits[0] + "://" + splits2[0];
}