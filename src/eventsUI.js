// create an iffe function to encapsulate the UI events handler function(s)
(function iifeUI() {
  // only create a new js namespace if it doesn't already exist
  window.jsEventHanders = window.jsEventHanders || {};

  // log a message if the reset button is clicked
  // document.querySelector('.btn-warning').addEventListener( 'click', function logMessage(e){
  //
  //   console.log("Clicked");
  // });

  /*
    Event #1:  After the user moves the cursor away from the "full name" input (that's the blur event), see if the input has a value (check the length of the value). If it does not, add a class of has-error to the ancestor section tag.
   */
   document.querySelector('#full-name').addEventListener('blur', function blurAction(e){
     // if the user moved the cursor away, check if there is an empty value
     if (!document.querySelector('#full-name').value) {
       document.querySelector('#full-name').parentNode.parentNode.classList.add('has-error');
     }
   })


   /*
      Event #2:  When the range input ("experience") is changed, update the text in the figure with the correct value from the input. So if I slide the dot to the right 1 step the figure should read "6 years".
    */



})();
