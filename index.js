const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  watch: true,
  express: app
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');

const middleware = function middlewareFunction (req, res, next) {
  if (!req.query.age) {
    return res.redirect('/');
  }
  next();
};

app.get('/', (req, res) => {
  return res.render('index');
});

app.post('/check', (req, res) => {
  const age = req.body.age;
  return res.redirect(age > 17 ? `/major?age=${age}` : `/minor?age=${age}`);
});

app.get('/major', middleware, (req, res) => {
  return res.render('major', { age: req.query.age });
});

app.get('/minor', middleware, (req, res) => {
  return res.render('minor', { age: req.query.age });
});

app.listen(3001);
