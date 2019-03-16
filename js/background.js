//confirmed este alerta aparece a meio da janela
//window.alert("teste");

//confirmed this changes the icon
chrome.browserAction.setIcon({
  path: "images/green_128.png" //any icon in the folder
});

chrome.runtime.onInstalled.addListener(function () {
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
});

