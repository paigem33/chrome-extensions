// document.addEventListener('DOMContentLoaded', function(){
//     document.querySelector('button').addEventListener('click', onClick, false);

//     function onClick(){
//         chrome.tabs.query({currentWindow: true, active: true},
//             function(tabs){
//                 chrome.tabs.sendMessage(tabs[0].id, 'hi')
//             })
//     }
// }, false)

jQuery(function() {
  
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
    
  });