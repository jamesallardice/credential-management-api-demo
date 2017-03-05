const path = require('path');
const config = require('config');
const multer = require('multer');
const express = require('express');

// Utility function to produce an HTML page.
function template(content) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Credential Management API Demo</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          ${content}
        </div>
        <script src="/client.js"></script>
      </body>
    </html>
  `;
}

// Configure Express.
const app = express();
const parser = multer();

app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.array());

// Routing. Defines a GET handler to render the login page and a POST handler
// to perform the login.
app.get('/', (req, res) => {

  const loginPage = `
    <h1>Login</h1>
    <div id="error" class="alert alert-danger" style="display: none"></div>
    <div id="success" class="alert alert-success" style="display: none"></div>
    <form method="post" action="/login" id="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" autocomplete="username" class="form-control">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" autocomplete="current-password" class="form-control">
      </div>
      <input type="submit" value="Login" class="btn btn-default">
    </form>
  `;

  res.status(200).send(template(loginPage));
});

app.post('/login', (req, res) => {

  const { username, password } = req.body;

  if (username === 'example' && password === 'password') {
    return res.status(200).json({
      token: '12345',
    });
  } else {
    return res.status(401).json({
      message: 'Invalid username or password.',
    });
  }
});

// Start the server.
const server = app.listen(config.get('port'), () => {

  const { port } = server.address();
  console.log(`Server running on port ${port}`);
});
