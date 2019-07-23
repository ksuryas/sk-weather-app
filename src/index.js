const path = require('path');

const hbs = require('hbs');

const express = require('express');

const geocode = require('./utils/geocode.js');

const forecast = require('./utils/forecast.js');

const app = express();

var errorMessage = 'Page not found'; 

const port = process.env.PORT || 3000;

// define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '/views');
const partialsPath = path.join(__dirname, '/views/partials');
// setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicPath));
// setup routes/pages using paths
// home page
app.get('/', (req, res) => {
	res.render('welcome', {
		title: 'Welcome to Saket Weather App!',
		name: 'Surya'
	});
});
app.get('/aboutUs', (req, res) => { // aboutUs
	res.render('aboutUs', {
		title: 'Weather App About',
		name: 'Surya K. & Andrew Mead'
	});
});
// weather starts
app.get('/weather', (req, res) => {
			if (!req.query.address) { // if starts
				return res.send({ // response sends
					code: 400,
					error: 'Bad request! Must provide address.'
				}); // response ends
			} // if ends
			geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
               // geocode starts
				if (error) { // if starts
					return res.send({ // response starts
						geocodeError: error
					}); // response ends
				} // if ends

				forecast(latitude, longitude, (error, forecast) => { // forecast starts
					if (error) { // if starts
						return res.send({
							forecastError: error
						}); // response ends
					} // if ends
					res.send({ // response starts
						location,
						address: req.query.address,
						forecast: 'The predicted forecast - ' + forecast
					}); // response ends

				}); // forecast ends
			}); // geocode ends
		}); // weather ends
app.get('/help', (req, res) => { // help
			res.render('help', {
				app: 'Go to home page & give location in the field. Then our server will tell you weather forecast.',
				title: 'Weather Help',
				name: 'Surya'
			});
		});

app.get('/help/*', (req, res) => { // help error
			res.render('404', {
				title: '404 Help',
				name: 'Surya K.',
				errorMessage: 'Help article not found'
			});
		});


app.get('*', (req, res) => { // app error
			res.render('404', {
				title: '404 Error',
				name: 'Surya K.',
				errorMessage
			});
		}); 

app.listen(port, () => {
		console.log('Starting server on port ' + port);
});