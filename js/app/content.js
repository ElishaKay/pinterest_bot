console.log("Content js script loaded.");

window.addEventListener("mouseup", wordSelected);

function wordSelected() {
  let selectedText = window.getSelection().toString();
  if(selectedText.length > 0) {
      console.log("selectedText: " + selectedText);
      // Send selected text to background page
      chrome.runtime.sendMessage(selectedText);
  }
}

var text = "hello";

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getText":
                sendResponse(text);
            case "userCreds":
            	console.log('these are the user creds',message.creds);
                sendResponse(text);
            break;
        }
    }
);