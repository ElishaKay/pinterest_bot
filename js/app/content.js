console.log("Content js script loaded.");

let search_term = localStorage.getItem('search_term');
// if the user is logged in
if (typeof search_term != 'undefined' && search_term){
  localStorage.removeItem('search_term');
  window.location.href = 'https://www.pinterest.com/search/pins/?q='+search_term;
}

if (window.location.href.includes('?q=')){
  let client_id = localStorage.getItem('client_id');
  let campaign_id = localStorage.getItem('campaign_id');
}


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "init":  

              break;

            case "scrapeTime":
              let search_term = message.campaign.search;
              let campaign_id = message.campaign.campaign_id;
              let client_id = message.creds.client_id;
            
              console.log('ran scrapeTime function in content.js')

              let images = document.querySelectorAll('.gridCentered img');
              let stuffToSave = [];
              console.log('these are the images:',images);
              for (i = 0; i < 5; i++) { 
                let image_description = images[i].alt;
                let image_src = images[i].src;
                stuffToSave.push({campaign_id, image_description, image_src});    
              }
              console.log(stuffToSave);
              chrome.runtime.sendMessage({type: "imageData", images: stuffToSave});

              function wait(ms){
                  var start = new Date().getTime();
                  var end = start;
                  while(end < start + ms) {
                  end = new Date().getTime();
                  }
              }

            break;
        }
    }
);


