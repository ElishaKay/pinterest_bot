console.log("Content js script loaded.");

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getText":
                sendResponse(text);
            case "userCreds":
            	console.log('these are the user creds',message.creds);
              console.log('this is the search_term',message.campaign.search);
              console.log('this is the search_term',message.campaign.campaign_id);

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

              localStorage.setItem('search_term', message.campaign.search);
              localStorage.setItem('client_id', message.creds.client_id);
              localStorage.setItem('campaign_id', message.campaign.campaign_id);
              
              wait(1000);
              login.click()
            break;
        }
    }
);

let search_term = localStorage.getItem('search_term');
// if the user is logged in
if (typeof search_term != 'undefined' && search_term){
  localStorage.removeItem('search_term');
  window.location.href = 'https://www.pinterest.com/search/pins/?q='+search_term;
}

if (window.location.href.includes('?q=')){
  let client_id = localStorage.getItem('client_id');
  let campaign_id = localStorage.getItem('campaign_id');
  let images = document.querySelectorAll('.gridCentered img');
  let stuffToSave = [];
  console.log('these are the images:',images);
  for (i = 0; i < 5; i++) { 
    let image_description = images[i].alt;
    let image_src = images[i].src;
    stuffToSave.push({client_id, campaign_id, image_description, image_src});    
  }
  console.log(stuffToSave);
  chrome.runtime.sendMessage({type: "imageData", images: stuffToSave});
}
