const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/boxoffice', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime);

app.get('/', (req, res) => {
  let responseText = 'Welcome to my app!';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.get('/secreturl', (req, res) => {
  let responseText = 'This is a secret url with super top-secret content.';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);

});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
const express = require('express'),
morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
app.get('/Movies', (req, res) => {
  res.send('Successful GET request returning data on all Movies');
});
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
