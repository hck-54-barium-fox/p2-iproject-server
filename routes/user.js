const express = require('express');
const routes = express.Router();
const axios = require('axios');
const GITHUB_CLIENT_ID = 'be3ebd106d67ef861d01';
const GITHUB_CLIENT_SECRET = '341e775120b1dd5d17099fe73cc97af71d3fae0f';
const UserController = require('../controllers/customerControllers');

// Create user
routes.post('/register', UserController.createUser);

// Verify user
routes.get('/verify', UserController.verifyUser);

// login

routes.post('/login', UserController.login);

// forgot password
// Forgot password route
routes.post('/forgot-password', UserController.forgetPassword);
// Reset password route
routes.patch('/reset-password', UserController.postUpdatedPassword);

// github login

routes.get('/login-github', (req, res) => {
  try {
    const redirectUri = encodeURIComponent(
      'http://localhost:3000/github/callback'
    );
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}`
    );
  } catch (err) {
    console.log(err);
  }
});

routes.get('/github/callback', async (req, res) => {
  try {
    const code = req.query.code;

    const response = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }
    );
    console.log(req.query.access_token);
    const token = JSON.stringify(response.data)?.split('=')[1].split('&')[0];
    // const responseData = JSON.parse(response.data);

    console.log(response, 'ini response data isi');
    const getDataUser = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(getDataUser, 'ini Data User dari mana terbaru');

    res.redirect(`http://localhost:8080/profile?access_token=${token}`);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send('Error exchanging authorization code for access token');
  }
});

module.exports = routes;
