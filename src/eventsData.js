// create an iffe function to encapsulate the UI events handler function(s)
(function iifeData() {
  // only create a new js namespace if it doesn't already exist
  window.jsEventHandlers = window.jsEventHandlers || {};

  // Function to process form submission
  window.jsEventHandlers.submitFn = function submitFn(action) {
    // do a fetch() to attempt to post the form data
    //
    //NOTE:  suppressing the following fetch failure:
      /*
      Fetch API cannot load http://requestb.in/1bpvy2i1.
      No 'Access-Control-Allow-Origin' header is present on the requested resource.
      Origin 'http://10.1.10.111:8080' is therefore not allowed access.
      If an opaque response serves your needs,
      set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
      10.1.10.111/:1 Uncaught (in promise) TypeError: Failed to fetch
       */
    // not clear on whether the "opaque" response is truly usable,
    // but at least I get a "failure" response
    // that can be used to achieve half-way functional code for a bad result
    let promiseSubmit = fetch(
      action,
      { method: 'post',
        mode: 'no-cors'
      }
    );

    // act on the response returned when the promise completes
    promiseSubmit.then(function checkResponse(response){
      window.jsEventHandlers.postResultsFn(response.status);
    });
  };
})();
