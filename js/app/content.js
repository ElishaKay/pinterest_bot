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
              // Logging In
              let inputEmail = document.querySelector('input#email');
              let inputPassword = document.querySelector('#password');
              let login = document.querySelector('button');

              function wait(ms){
                  var start = new Date().getTime();
                  var end = start;
                  while(end < start + ms) {
                  end = new Date().getTime();
                  }
              }

              wait(2000);

              inputEmail.value = message.creds.user_email;
              inputPassword.value = message.creds.user_password;
              login.click()
              sendResponse(text);
            break;
        }
    }
);