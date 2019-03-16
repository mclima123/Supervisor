var hasCreated = false;

createModal();
showModal();

chrome.runtime.onMessage.addListener(
  function (message, callback) {
    if (message == "runContentScript") {
      chrome.tabs.executeScript({
        file: 'contentScript.js'
      });
    }
  }
);

function createModal() {
  console.log("createmodal");

  if (!hasCreated) {
    let myDialog = document.createElement("div");
    myDialog.id = "myModal";
    myDialog.classList.add("modal", "fade");
    myDialog.role = "dialog";
    myDialog.innerHTML = "<div class=\"modal-dialog\">";
    myDialog.innerHTML += "<div class=\"modal-content\">";
    myDialog.innerHTML += "<div class=\"modal-header\">";
    myDialog.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    myDialog.innerHTML += "<h4 class=\"modal-title\">Modal Header</h4>";
    myDialog.innerHTML += "</div>";
    myDialog.innerHTML += "<div class=\"modal-body\">";
    myDialog.innerHTML += "<p>Some text in the modal.</p>";
    myDialog.innerHTML += "</div>";
    myDialog.innerHTML += "<div class=\"modal-footer\">";
    myDialog.innerHTML += "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
    myDialog.innerHTML += "</div></div></div></div>";

    document.getElementsByTagName('body')[0].appendChild(myDialog);

    hasCreated = true;
  }
}

function showModal() {
  console.log("showModal");

  document.getElementById("myModal").modal({ show: true })
  //document.getElementById("myModal").showModal();
}