// References to useful elements.
const form = document.getElementById('login-form');
const msg = document.getElementById('error');
const successMsg = document.getElementById('success');

// Function to validate and handle the response from our login API on the
// server.
function validateResponse(res, credentials) {
  if (res.token) {
    successMsg.innerHTML = 'Signed in successfully';
    successMsg.style.display = 'block';

    // Logged in successfully. If the browser supports the Credential
    // Management API we can attempt to save the provided login details.
    if (navigator.credentials) {
      return navigator.credentials.store(credentials)
        .then((result) => {
          // Successfully stored the credentials that were used to log in.
          console.log(result);
        });
    }
  }

  throw new Error(res.message);
}

// Function to make an HTTP request to our login API using fetch. Handles both
// FormData instances and Credential instances.
function sendLoginRequest(formData) {
  const fetchOpts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  };
  let credentials = formData;

  if (navigator.credentials) {
    if (formData instanceof FormData) {
      credentials = new PasswordCredential({
        id: formData.get('username'),
        password: formData.get('password'),
      });
      credentials.additionalData = formData;
    }

    fetchOpts.credentials = credentials;
  } else {
    fetchOpts.body = credentials;
  }

  return fetch('/login', fetchOpts)
  .then((res) => res.json())
  .then((json) => validateResponse(json, credentials))
  .catch((err) => {
    msg.innerHTML = err.message;
    msg.style.display = 'block';
  });
}

//
// App logic. The following code will run on page load since the script is
// included at the end of the body. Bind event handlers and ask the browser for
// any password credentials that might be stored for this origin.
//

navigator.credentials.get({
  password: true,
})
.then((credentials) => {
  // If the browser has handed us a set of credentials we can use them to
  // log the user in automatically. If the user does not have any credentials
  // stored for this origin, or if they refused permission to the browser to
  // hand them to us, the credentials object here will be undefined.
  console.log(credentials);

  if (credentials) {
    sendLoginRequest(credentials);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendLoginRequest(new FormData(form));
});
