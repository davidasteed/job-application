// create an iffe function to encapsulate the UI events handler function(s)
(function iifeUI() {
  // only create a new js namespace if it doesn't already exist
  window.jsEventHandlers = window.jsEventHandlers || {};

  // UI Event #1:  After the user moves the cursor away from the "full name" input (that's the blur event), see if the input has a value (check the length of the value). If it does not, add a class of has-error to the ancestor section tag.
  document.querySelector('#full-name').addEventListener('blur', function blurAction(e){
    // if the user moved the cursor away, check if there is an empty value
    let fullName = document.querySelector('#full-name');
    if (!fullName.value) {
      // add has-error class to the section
      fullName.parentNode.parentNode.classList.add('has-error');
    }
  })

  // UI Event #2:  When the range input ("experience") is changed, update the text in the figure with the correct value from the input. So if I slide the dot to the right 1 step the figure should read "6 years".
  // on the event listener for the range input, watch for changes to the value
  document.querySelector('#exp').addEventListener('change', function valueAction(e){
    document.querySelector('#exp + figure').innerText = e.target.value + ' years';
  });

  // UI Event #3:  When one of the "language" checkboxes is checked, increment the number of languages in the figure tag. For example, if I check "JS" and "HTML" then the figure should read: "2 languages". If I uncheck a box, the number of languages should decrease.
  // for an array of event listeners,
  // run a function on each event listener to evaluate and increment the number of languages
  Array.from(document.querySelectorAll('[name="languages"]'))
  .forEach(function listenerFn(checkbox){
    checkbox.addEventListener('change', function incrementFn(e){
      // extract/store the numerical current language count
      let currentValue = parseInt(document.querySelector('.checkbox-inline + figure').innerText);

      // set the value to higher, or lower, based on whether the checkbox was checked, or unchecked
      document.querySelector('.checkbox-inline + figure').innerText =
      e.target.checked ? (currentValue + 1) + ' languages' : (currentValue - 1) + ' languages';
    });
  });

  // UI Event #4: "Do not allow the form to be submitted, you will need to prevent the submit event from occurring."
  // Instead, when the form attempts to be submitted, call a function in your other module (you can name it whatever you want)
  document.querySelector('form').addEventListener('submit', function submitFn(e){
    // prevent the submit from being sent
    e.preventDefault();

    // store the action url
    let actionUrl = document.querySelector('form').action;

    // call function to handle data submission, and pass th Action url
    window.jsEventHandlers.submitFn(actionUrl);
  });

  window.jsEventHandlers.postResultsFn = function postResultsFn(code) {
    let resultsSel = document.querySelector('#results');
    if (code > 199 && code < 300) {
      // set the results element to display: block
      resultsSel.style.display = 'block';
      // add "success message" inside the results element
      resultsSel.innerText =
      "Your application has been received!";
    } else {
      // change the class to "has-error"
      resultsSel.classList.add('has-error');
      // set the results element to display: block
      resultsSel.style.display = 'block';
      // add "failure message" inside the results element
      resultsSel.innerText =
      "Your application failed with HTTP POST result code: " + code;
    }
  }
})();
