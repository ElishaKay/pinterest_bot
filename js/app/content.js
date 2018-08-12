console.log("Content js script loaded.");

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
              
              wait(500);

              login.click()
              localstorage.setItem(loggedIn, true);
              localstorage.setItem(search_term, message.campaign.search_term);
              // sendResponse(text);
            break;
        }
    }
);


// if the user is logged in
if(localstorage.getItem(loggedIn) && window.location.href === "https://www.pinterest.com") {
  let search_term = localstorage.getItem(search_term);
  window.location.href = 'https://www.pinterest.com/search/pins/?q='+search_term;
}



// if(locastorage.getItem(loggedIn) && window.location.href.includes("world")) {

// let images = document.querySelectorAll('.gridCentered img');

// }

// window.addEventListener("mouseup", wordSelected);

//sending message up to the popup
// function wordSelected() {
//   let selectedText = window.getSelection().toString();
//   if(selectedText.length > 0) {
//       console.log("selectedText: " + selectedText);
//       // Send selected text to background page
//       chrome.runtime.sendMessage(selectedText);
//   }
// }