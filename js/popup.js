let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'document.body.style.backgroundColor = "' + color + '";' });
  });
};


/*
https://stackoverflow.com/questions/8894461/updating-an-extension-button-dynamically-inspiration-required
-mudar o icon da extensão consoante o site e tempo em que está no site

https://scotch.io/@dongido/how-to-build-a-google-chrome-extension
-css and stuff

*/