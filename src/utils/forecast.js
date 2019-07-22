const request = require('request');
const log = console.log;

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/38b9540463551b5f1376f0f62e220b42/' + latitude + ',' + longitude;
	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('Our weather server is currently down! Please try again.');
		} else
		if (body.error) {
			callback('Invalid co-ordinates! Please check the co-ordinates and try again.');
		} else {
			var temp = body.currently.temperature;
			var precip = body.currently.precipProbability;
			var daily = body.daily.data[0].summary;
			callback(undefined, daily + ' It is currently ' + temp + ' degrees faranheit out. There is ' + precip + '% chance of rain.');
		}
	});
};

module.exports = forecast;
