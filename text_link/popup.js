// document.addEventListener('DOMContentLoaded', function(){
//     document.querySelector('button').addEventListener('click', onClick, false);

//     function onClick(){
//         chrome.tabs.query({currentWindow: true, active: true},
//             function(tabs){
//                 chrome.tabs.sendMessage(tabs[0].id, 'hi')
//             })
//     }
// }, false)

// jQuery(function() {
  
    jQuery('.dropdown > .caption').on('click', function() {
      jQuery(this).parent().toggleClass('open');
    });
    
    jQuery('.dropdown > .list > .item').on('click', function() {
      jQuery('.dropdown > .list > .item').removeClass('selected');
      jQuery(this).addClass('selected').parent().parent().removeClass('open').children('.caption').text( jQuery(this).text() );
    });
    
    jQuery(document).on('keyup', function(evt) {
      if ( (evt.keyCode || evt.which) === 27 ) {
        jQuery('.dropdown').removeClass('open');
      }
    });
    
    jQuery(document).on('click', function(evt) {
      if ( jQuery(evt.target).closest(".dropdown > .caption").length === 0 ) {
        jQuery('.dropdown').removeClass('open');
      }
    });

    jQuery('#my_info').on('click', function() {
      jQuery('.popup_main').hide();
      jQuery('.popup_info').show();
    });

    jQuery('#my_contacts').on('click', function() {
      jQuery('.popup_main').hide();
      jQuery('.popup_contacts').show();
    });

    jQuery('.back').on('click', function() {
      jQuery('.popup_info, .popup_contacts').hide();
      jQuery('.popup_main').show();
    })


  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#test').addEventListener('click', getCurrentTabAndUrl);

});

function getCurrentTabAndUrl() {

  chrome.tabs.getSelected(null, function(tab) {

        var tabId = tab.id;
        var tabTitle=tab.title;
        var tabUrl = tab.url;
        if (tabUrl=="chrome://newtab/") {
          //document.getElementById("data").innerHTML="Looks like you opened a new tab, please open a web page and click again to Share.";
        }else {
        //document.getElementById("data").innerHTML="subject="+tabTitle+'<br/>'+tabUrl;

        //var to=document.getElementById("to").value;


        sendMessage('me','paigemacgregor33@gmail.com',tabTitle,tabUrl);

        }
    });
}

    function sendMessage(userId, to, subject, email) {
      authUser(function() {
          var base64EncodedEmail = btoa(email);
          var request = gapi.client.gmail.users.messages.send({
              'userId': userId,
              'message': {
                  'raw': base64EncodedEmail,
                  'headers': [
                      {'To': to}, 
                      {'Subject': subject}
                  ]
              }
          });
          request.execute();
      });
  }
  
  //how to get if going this route?
  function authUser(callback) {
      chrome.identity.getAuthToken({'interactive': true}, function(token) {
          // load Google's javascript client libraries
          var url = "https://www.googleapis.com/gmail/v1/users/me/messages/send?access_token=" + token;
          var request = new XMLHttpRequest();
          request.onreadystatechange = function() {
              if (request.readyState !== 4 || request.status !== 200) {
                  return;
              }
              var response = JSON.parse(request.responseText);
              console.log(response);
              callback();
          }
          ;
          request.open('POST', url, true);
          request.send();
          request.setRequestHeader('Authorization', 'Bearer ' + token);
      });
  }
    
  // });