// create an iffe function to encapsulate the UI events handler function(s)
(function() {
  'use strict';
  // only create a new js namespace if it doesn't already exist
  window.jsEventHandlers = window.jsEventHandlers || {};

  // Function to process form submission
  /**
   * Ajax fetch() to submit data
   * @param  {string}     url       fetch() url
   * @param  {js object}  eventObj  form data from UI api
   * @return {void}                 no return object
   */
  window.jsEventHandlers.submitFn = function submitFn(url, eventObj) {
    // do a fetch() to attempt to post the form data
    //NOTE:  As per Jordan:  requestb.in does not accept AJAX fetch(),
    //       so this fails as expected
    let promiseSubmit = fetch(
      url,
      { method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: eventObj.target[1].value,
        exp: eventObj.target[2].value,
        languages_js: eventObj.target[3].checked,
        languages_html: eventObj.target[4].checked,
        languages_css: eventObj.target[5].checked,
        previous_work_url: eventObj.target[7].value
      })
    }
  );

  // act on the response returned when the promise completes
  promiseSubmit.then(function checkResponse(response){
    window.jsEventHandlers.postResultsFn(response.status);
  });
};
})();
