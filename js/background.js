//confirmed este alerta aparece a meio da janela
//window.alert("teste");
const MAX_TIME = 3600; //em segundos   3600s -> 1h
var timer = 0;
var badTabsOpen = 0;
var colour;
setInterval(runEverySecond, 1000);

function runEverySecond(){
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if(tabs.length != 0){
      isBlacklistedUrlOpen(getURLDomain(tabs[0].url))
    }
    console.log("timer: " + timer);
  })

  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    badTabsOpen -= badTabsOpen;
    
    for(let i=0; i<tabs.length; i++){
      badTabsOpen += isBlacklistedTabOpen(getURLDomain(tabs[i].url));
    }

    if(badTabsOpen == 0){
      chrome.browserAction.setBadgeText({text: ""});
    }
    else {
      chrome.browserAction.setBadgeText({text: "" + badTabsOpen});
    }
  })

  if( timer < (MAX_TIME/3) ){ // tempo < 33%
    colour = "green"
    setColour()
  } else if ( timer > (MAX_TIME/3) && timer < (2*MAX_TIME/3) ){ // 33% > tempo < 66%
    colour = "yellow"
    setColour()
  } else if ( timer > (2*MAX_TIME/3) ){ // tempo > 66%
    colour = "red"
    setColour()
  } else if ( timer > (9*MAX_TIME/10) ){ // tempo > 90%
    if(colour === "red")
    {
      colour = "gray";
      setColour()
    }
    else
    {
      colour = "red";
      setColour();
    }
  }

  if(timer == MAX_TIME)
  {
    alert("test boi");
    timer -= MAX_TIME; // timer = 0 doesn't reset it god bless
  }
}

// colour = "green" | "yellow" | "red"
function setColour(){
  chrome.browserAction.setIcon({
    path: "images/" + colour + "_128.png" //any icon in the folder
  });
}

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
    if(currentUrl === blacklist[i])
      timer++;
  }
}

function isBlacklistedTabOpen(currentUrl){
  let blacklist = []
  let count = 0;
  let aux = localStorage.getItem('blacklist')
  blacklist = aux == null ? blacklist : JSON.parse(aux)

  for(let i=0; i<blacklist.length; i++)
  {
    // if it ends with '.com/' then make '.com'
    if (currentUrl[currentUrl.length-1] === '/'){
      currentUrl.splice(currentUrl.length-1, 1)
    }

    if(currentUrl === blacklist[i]){
      count++;
    }
  }

  return count
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