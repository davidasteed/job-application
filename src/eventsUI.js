// create an iffe function to encapsulate the UI events handler function(s)
(function() {
  'use strict';
  // only create a new js namespace if it doesn't already exist
  window.jsEventHandlers = window.jsEventHandlers || {};

  // UI Event #1:  After the user moves the cursor away from the "full name" input (that's the blur event), see if the input has a value (check the length of the value). If it does not, add a class of has-error to the ancestor section tag.
  document.querySelector('#full-name').addEventListener('blur', function blurAction(e){
    if (!e.target.value) {
        e.target.parentNode.parentNode.classList.add('has-error');
    }
  });


  // if the user clicks into the "full name" input element, then remove the error class
  document.querySelector('#full-name').addEventListener('click', function clickAction(e){

    if (e.target.parentNode.parentNode.classList.contains('has-error')) {
      e.target.parentNode.parentNode.classList.remove('has-error');
    }
  });

  // UI Event #2:  When the range input ("experience") is changed, update the text in the figure with the correct value from the input. So if I slide the dot to the right 1 step the figure should read "6 years".
  // on the event listener for the range input, watch for changes to the value
  document.querySelector('#exp').addEventListener('change', function valueAction(e){
    e.target.parentNode.childNodes[3].innerText = e.target.value + ' years';
  });

  // UI Event #3:  When one of the "language" checkboxes is checked, increment the number of languages in the figure tag. For example, if I check "JS" and "HTML" then the figure should read: "2 languages". If I uncheck a box, the number of languages should decrease.
  // for an array of event listeners,
  // run a function on each event listener to evaluate and increment the number of languages

  // numerical language counter
  let langCounter = 0;

  Array.from(document.querySelectorAll('[name="languages"]'))
  .forEach(function listenerFn(checkbox){
    checkbox.addEventListener('change', function incrementFn(e){

      // set language counter figure element to indicate higher, or lower, based on whether the checkbox was checked, or unchecked.
      if (e.target.checked === true) {
        langCounter++;
        // increment the numerical counter
        e.target.parentNode.parentNode.childNodes[7].innerText = langCounter + ' languages';

      } else if (e.target.checked === false){
        // Ensure not to decrement if langCounter already equals zero.
        if (langCounter) {
          langCounter--;
          // increment the numerical counter
          e.target.parentNode.parentNode.childNodes[7].innerText = langCounter + ' languages';
        }
      }
    });
    // set the language counter to equal the total
    // document.querySelector('.checkbox-inline + figure').innerText = langCounter;
  });

  // UI Event #4: "Do not allow the form to be submitted, you will need to prevent the submit event from occurring."
  // Instead, when the form attempts to be submitted, call a function in your other module (you can name it whatever you want)
  document.querySelector('form').addEventListener('submit', function handler(e){
    // prevent the submit from being sent
    e.preventDefault();

    // store the action url
    let actionUrl = document.querySelector('form').action;

    // call function to handle data submission,
    // and pass the Action url and the eventListener object
    window.jsEventHandlers.submitFn(actionUrl, e);
  });

  /**
   * [postResultsFn description:  handle error reporting after form submission]
   * @param  {number} code [the response.status from the fetch post()]
   * @return {void}        [nothing is returned]
   */
  window.jsEventHandlers.postResultsFn = function postResultsFn(code) {
    let resultsSel = document.querySelector('#results');
    if (code > 199 && code < 300) {
      // set the results element to display: block
      resultsSel.style.display = 'block';
      // add "success message" inside the results element
      resultsSel.innerText =
      'Your application has been received!';
    } else {
      // change the class to "has-error"
      resultsSel.classList.add('has-error');
      // set the results element to display: block
      resultsSel.style.display = 'block';
      // add "failure message" inside the results element
      resultsSel.innerText =
      'Your application failed with HTTP POST result code: ' + code;
    }
  };
})();
