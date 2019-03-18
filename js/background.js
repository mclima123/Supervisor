//confirmed este alerta aparece a meio da janela
//window.alert("teste");
const MAX_TIME = 3600; //em segundos   3600s -> 1h
var timer = 0;
var badTabsOpen = 0;
var colour;
var prevRand = 0;
setInterval(runEverySecond, 1000);

function runEverySecond() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if (tabs.length != 0) {
      isBlacklistedUrlOpen(getURLDomain(tabs[0].url))
    }
    console.log("timer: " + timer);
  })

  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    badTabsOpen -= badTabsOpen;

    for (let i = 0; i < tabs.length; i++) {
      badTabsOpen += isBlacklistedTabOpen(getURLDomain(tabs[i].url));
    }

    if (badTabsOpen == 0) {
      chrome.browserAction.setBadgeText({ text: "" });
    }
    else {
      chrome.browserAction.setBadgeText({ text: "" + badTabsOpen });
    }
  })

  if (timer < (MAX_TIME / 2)) { // tempo < 50%
    colour = "green"
    setColour();
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.getElementById("camadaCor").style.backgroundColor = "rgba(255, 255, 255, 0)"' });
    })

  } else if (timer > (MAX_TIME / 2) && timer < (3 * MAX_TIME / 4)) { // 50% > tempo < 75%
    colour = "yellow"
    setColour();
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.getElementById("camadaCor").style.backgroundColor = "rgba(243,247,129, 0.3)";' });
    })
  } else if (timer > (3 * MAX_TIME / 4) && timer < (9 * MAX_TIME / 10)) { // 75% > tempo < 90%
    colour = "red"
    setColour();
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.getElementById("camadaCor").style.backgroundColor = "rgba(253,120,120, 0.3)";' });
    })
  } else if (timer > (9 * MAX_TIME / 10)) { // tempo > 90%
    if (colour === "red") {
      colour = "gray";
      setColour();
    }
    else {
      colour = "red";
      setColour();
    }
  }

  if (timer == MAX_TIME) {
    let random;
    do {
      random = Math.floor((Math.random() * 5) + 1);
    } while (prevRand === random);

    prevRand = random;
    doAlert(random);
    timer -= timer; // timer = 0 doesn't reset it god bless
  }
}

function doAlert(rand) {
  if (rand == 1) {
    alert('The weather is nice today. Perfect for a quick walk.\n\nCurrent temperature: 21ºC');
  }
  else if (rand == 2) {
    alert('There are some events near you:\n\n - Party at SomeDisco at 14h\n - Sunset at SomeBeach at 18h');
  }
  else if (rand == 3) {
    alert('"The greatest amount of wasted time is the time not getting started."');
  }
  else if (rand == 4) {
    alert('"A year from now, you\'ll wish you had started today."');
  }
  else {
    alert('"The secret of getting ahead is getting started."');
  }
}

// colour = "green" | "yellow" | "red"
function setColour() {
  chrome.browserAction.setIcon({
    path: "images/" + colour + "_128.png" //any icon in the folder
  });
}

function isBlacklistedUrlOpen(currentUrl) {
  let blacklist = []
  let aux = localStorage.getItem('blacklist')
  blacklist = aux == null ? blacklist : JSON.parse(aux)

  for (let i = 0; i < blacklist.length; i++) {
    // if it ends with '.com/' then make '.com'
    if (currentUrl[currentUrl.length - 1] === '/') {
      currentUrl.splice(currentUrl.length - 1, 1)
    }
    if (currentUrl === blacklist[i])
      timer++;
  }
}

function isBlacklistedTabOpen(currentUrl) {
  let blacklist = []
  let count = 0;
  let aux = localStorage.getItem('blacklist')
  blacklist = aux == null ? blacklist : JSON.parse(aux)

  for (let i = 0; i < blacklist.length; i++) {
    // if it ends with '.com/' then make '.com'
    if (currentUrl[currentUrl.length - 1] === '/') {
      currentUrl.splice(currentUrl.length - 1, 1)
    }

    if (currentUrl === blacklist[i]) {
      count++;
    }
  }

  return count
}

function getURLDomain(url) {
  var splitsHttp = url.split("://")       // http + <rest of the url>
  var splitsWww = "";
  if (splitsHttp[0].length == url.length) {
    splitsWww = url.split("/");
  }
  else {
    splitsWww = splitsHttp[1].split("/")  // site.com + page identifier
  }

  return splitsWww[0];
}
