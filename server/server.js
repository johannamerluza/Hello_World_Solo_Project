const express = require('express');
const countryController = require('./countryController');
const fsCallback = require('fs');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//server index html
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/api', countryController.getAllCountries, (req, res) => {
  return res.status(200).json(res.locals.allCountries);
});

app.post('/api', countryController.addCountry, (req, res) => {
  return res.status(200).send(`${res.locals.addCountry} was added`);
});

app.delete('/api', countryController.deleteCountry, (req, res) => {
  return res.status(200).send(`${res.locals.deleteCountry} was deleted`);
});

app.put('/api', countryController.updateCountry, (req, res) => {
  return res.status(200).send(`${res.locals.updateCountry} was updated`);
});

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for..."),
);

/* start server */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
