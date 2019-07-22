const request = require('request');
const log = console.log;

const geocode = (address, callback) => {
		
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3N1cnlhMTIiLCJhIjoiY2p5N2Ntem0zMG4xZDNocGpiMXY0cTIzMyJ9.Znm1IDPB3JvPkNYfJyi5gg&limit=1';
	request({url, json: true}, (error, {body}) => {
		if(error) {
			callback('Unable to connect location services!');
		} else if(body.features.length === 0) { 
			callback('Invalid place! Try again.');
	    }  else {
			callback(undefined, {
			    latitude: body.features[0].center[1],
				longitude:body.features[0].center[0],
		        location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;