const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./weather');

//express
const app = express();

//static, views and partials configurations
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/templates/views'));
hbs.registerPartials(path.join(__dirname, '/templates/partials'));

//routing
app.get('/', (req, res) => {
    res.render('index', { 
      title: 'Welcome To Forecaster'
    });
});

app.get('/forecast/:place', async (req, res) => {
  const place = req.params.place; 
  let forecast = {};

  await weather.forecast(place.toLowerCase())
    .then((data) => {
        forecast = data;
      }, (rej) => {
        forecast = { error: rej };
      });
  
  res.json(forecast);
});

app.get('/about', (req, res) => {
    res.render('about', { 
      title: 'About Forecaster',
      info: 'Forecaster is a simple application created by DEGA to forecast your city.'
    });
});

app.get('/data/:place', async (req, res) => {
    const place = req.params.place; //req.query.place; //from query string

    if (!place) {
      res.send('Place Not Found!');
      return;
    }

    res.send(await weather.forecast(place.toLowerCase()));
});

app.get('*', (req, res) => {
  res.status(404).render('404', { title: '404!', usr: 'Vins' });
});

const d = new Date();
const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
app.listen(3080, () => console.log(time,'SERVER IS RUNNING ON PORT: 3080'));