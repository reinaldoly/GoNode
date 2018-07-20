const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const moment = require('moment');
const path = require('path');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res, next) => {
  const { name, birthdate } = req.body;
  const age = moment().diff(moment(birthdate, 'DD/MM/YYYY'), 'years');
  if (age >= 18) {
    res.redirect(`/major?nome=${name}`);
  } else {
    res.redirect(`/minor?nome=${name}`);
  }
  next();
});

const checkParamsMiddleware = (req, res, next) => {
  const { nome } = req.query;
  if (nome === '' || nome === undefined) {
    res.redirect('/');
  } else {
    next();
  }
};

app.get('/major', checkParamsMiddleware, (req, res) => {
  const { nome } = req.query;
  res.render('major', { nome });
});

app.get('/minor', checkParamsMiddleware, (req, res) => {
  const { nome } = req.query;
  res.render('minor', { nome });
});

app.listen(3000);
